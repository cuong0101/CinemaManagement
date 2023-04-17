
using Abp.Runtime.Session;
using CinemaManagement.Data;
using CinemaManagement.DTOs;
using CinemaManagement.Entities;
using CinemaManagement.Interfaces;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CloudinaryDotNet;
using System;
using CloudinaryDotNet.Actions;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using CinemaManagement.DTOs.WeuDtos;

namespace CinemaManagement.Controllers.WeuController
{
    public class CustomerController : BaseApiCusController
    {
        private Cloudinary cloudinary;
        public const string CLOUD_NAME = "vitcamo";
        public const string API_KEY = "994713494841983";
        public const string API_SECRET = "j4IFJKw-dNFx382XJgZF0JYS3IY";
        private readonly DataContext _context;
        private readonly DapperContext _dapper;
        private readonly ITokenService _tokenService;

        public CustomerController(DataContext context, DapperContext dapper, ITokenService tokenService)
        {
            _context = context;
            _dapper = dapper;
            _tokenService = tokenService;
        }

        [HttpGet("GetAll")]
        public async Task<List<CustomerDto>> GetAll()
        {
            using (var conn = _dapper.CreateConnection())
            {
                var cus = await conn.QueryAsync<CustomerDto>(@"
                Select * from MstCustomer where isDeleted = 0");
                return cus.ToList();
            }
        }

        [HttpGet("GetMyInfo")]
        public async Task<CustomerDto> GetMyInfo()
        {
            var mail = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;

            using (var conn = _dapper.CreateConnection())
            {
                var cus = await conn.QueryAsync<CustomerDto>(@"
                Select * from MstCustomer where isDeleted = 0 and Email = @mail",new { mail = mail});
                return cus.FirstOrDefault();
            }
        }

        [HttpPost("EditMyInfo")]
        public async Task<ActionResult> EditMyInfo([FromForm]CustomerEditDto input)
        {
            var cus = _context.MstCustomer.Find(GetMyInfo().Result.Id);
            if (await _context.MstCustomer.AnyAsync(e => e.Phone == input.phone)) return BadRequest("Phone number is taken");

            Account account = new Account(CLOUD_NAME, API_KEY, API_SECRET);
            cloudinary = new Cloudinary(account);

            try
            {
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(input.image.FileName, input.image.OpenReadStream()),
                    PublicId = Guid.NewGuid().ToString(),
                    Transformation = new Transformation().Crop("limit").Width(1000).Height(1000)
                };
                var uploadResult = await cloudinary.UploadAsync(uploadParams);
                var imageUrl = uploadResult.Url.ToString();

                cus.Name = string.IsNullOrWhiteSpace(input.name) || string.IsNullOrEmpty(input.name) ? GetMyInfo().Result.Name : input.name;
                cus.Image = imageUrl ?? GetMyInfo().Result.Image;
                cus.Address = string.IsNullOrWhiteSpace(input.address) || string.IsNullOrEmpty(input.address) ? GetMyInfo().Result.Address : input.address;
                cus.Phone = string.IsNullOrWhiteSpace(input.phone) || string.IsNullOrEmpty(input.phone) ? GetMyInfo().Result.Phone : input.phone;
                _context.MstCustomer.Update(cus);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw new Exception("Error to loading");
            }  
            return Ok("Update account successfully");
        }

        [HttpPost("Register")]
        [Consumes("multipart/form-data")]
        [RequestFormLimits(MultipartBodyLengthLimit = 209715200/2)]
        public async Task<ActionResult> Register([FromForm] CustomerRegisterDto input)
        {
            var hmac = new HMACSHA512();
            if (CustomerExists(input.Email).Result)
                return BadRequest("Email is taken");
            if (CustomerExists(input.Phone).Result)
                return BadRequest("Phone number is taken");

            Account account = new Account(CLOUD_NAME, API_KEY, API_SECRET);
            cloudinary = new Cloudinary(account);
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(input.Image.FileName, input.Image.OpenReadStream()),
                PublicId = Guid.NewGuid().ToString(),
                Transformation = new Transformation().Crop("limit").Width(1000).Height(1000)
            };
            var uploadResult = await cloudinary.UploadAsync(uploadParams);
            var imageUrl = uploadResult.Url.ToString();

            var noAvaUrl = "https://res.cloudinary.com/vitcamo/image/upload/v1681699791/no_avatar_flmg5r.png";

            var customer = new MstCustomer
            {
                Name = input.Name,
                Image = imageUrl ?? noAvaUrl,
                Address = input.Address,
                Phone = input.Phone,
                DoB = input.DoB,
                Sex = input.Sex,
                Email = input.Email,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(input.password)),
                PasswordSalt = hmac.Key
            };

            _context.Add(customer);
            await _context.SaveChangesAsync();
            return Ok("Register successfully");
        }

        private async Task<bool> CustomerExists(string input)
        {
            return await _context.MstCustomer.AnyAsync(e => e.Email == input || e.Phone == input);
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> Login(CustomerLoginDto input)
        {
            var customer = await _context.MstCustomer.SingleOrDefaultAsync(e => e.Email == input.email);
            if (customer == null)
                return Unauthorized();
            var hmac = new HMACSHA512(customer.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(input.password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != customer.PasswordHash[i]) return Unauthorized();
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, input.email)
            };
            var accessToken = _tokenService.GenerateAccessToken(claims);
            var refreshToken = _tokenService.GenerateRefreshToken();
            customer.RefreshToken = refreshToken;
            customer.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);
            await _context.SaveChangesAsync();

            return new UserDto()
            {
                Username = customer.Name,
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }
    }
}
