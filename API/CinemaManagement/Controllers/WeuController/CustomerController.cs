using Abp.Json;
using AutoMapper;
using CinemaManagement.Controllers.CmsController;
using CinemaManagement.Data;
using CinemaManagement.DTOs;
using CinemaManagement.DTOs.WeuDtos;
using CinemaManagement.Entities;
using CinemaManagement.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CinemaManagement.Controllers.WeuController
{
    public class CustomerController : BaseApiController_new
    {
        private Cloudinary cloudinary;
        public const string CLOUD_NAME = "vitcamo";
        public const string API_KEY = "994713494841983";
        public const string API_SECRET = "j4IFJKw-dNFx382XJgZF0JYS3IY";
        private readonly DataContext _context;
        private readonly DapperContext _dapper;
        private readonly ITokenService _tokenService;

        public CustomerController(DataContext context, ITokenService tokenService, DapperContext dapper, IMapper mapper) : base(mapper)
        {
            _context = context;
            _tokenService = tokenService;
            _dapper = dapper;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            using (var conn = _dapper.CreateConnection())
            {
                var cus = await conn.QueryAsync<CustomerDto>(@"
                Select * from MstCustomer where isDeleted = 0");
                return CustomResult(cus.ToList());
            }
        }

        [HttpGet("GetMyInfo")]
        public async Task<IActionResult> GetMyInfo()
        {
            var id = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;

            using (var conn = _dapper.CreateConnection())
            {
                var cus = await conn.QueryAsync<CustomerDto>(@"
                Select * from MstCustomer where isDeleted = 0 and id = @id", new { id = id });
                return CustomResult(cus.FirstOrDefault());
            }
        }

        [HttpPost("EditMyInfo")]
        public async Task<IActionResult> EditMyInfo([FromForm] CustomerEditDto input)
        {
            var response = new WebEndUserDto<object>(false, null, 500, "");
            var cus = _context.MstCustomer.Find(GetMyInfo().Result);
            if (await _context.MstCustomer.AnyAsync(e => e.Phone == input.phone)) response.Message = "Phone number is taken";

            try
            {
                var imageUrl = cus.Image;
                if (input.image != null)
                {
                    Account account = new Account(CLOUD_NAME, API_KEY, API_SECRET);
                    cloudinary = new Cloudinary(account);
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(input.image.FileName, input.image.OpenReadStream()),
                        PublicId = Guid.NewGuid().ToString(),
                        Transformation = new Transformation().Crop("limit").Width(1000).Height(1000)
                    };
                    var uploadResult = await cloudinary.UploadAsync(uploadParams);
                    imageUrl = uploadResult.Url.ToString();
                }
                cus.Name = string.IsNullOrWhiteSpace(input.name) || string.IsNullOrEmpty(input.name) ? cus.Name : input.name;
                cus.Image = imageUrl;
                cus.Address = string.IsNullOrWhiteSpace(input.address) || string.IsNullOrEmpty(input.address) ? cus.Address : input.address;
                cus.Phone = string.IsNullOrWhiteSpace(input.phone) || string.IsNullOrEmpty(input.phone) ? cus.Phone : input.phone;
                _context.MstCustomer.Update(cus);
                await _context.SaveChangesAsync();
                return CustomResult(true);
            }
            catch (Exception e)
            {
                return CustomResult(e.Message);
            }
        }

        [HttpPost("Register")]
        [Consumes("multipart/form-data")]
        [RequestFormLimits(MultipartBodyLengthLimit = 209715200/2)]
        public async Task<WebEndUserDto<object>> Register([FromForm] CustomerRegisterDto input)
        {
            string imageUrl = "https://res.cloudinary.com/vitcamo/image/upload/v1681699791/no_avatar_flmg5r.png";
            var response = new WebEndUserDto<object>(false, null, 500, "");
            var hmac = new HMACSHA512();
            if (CustomerExists(input.Email).Result)
            {
                response.Message = "Email is taken";
            }
            if (CustomerExists(input.Phone).Result)
            {
                response.Message = "Phone number is taken";
            }
            try
            {
                if (input.Image != null)
                {
                    Account account = new Account(CLOUD_NAME, API_KEY, API_SECRET);
                    cloudinary = new Cloudinary(account);
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(input.Image.FileName, input.Image.OpenReadStream()),
                        PublicId = Guid.NewGuid().ToString(),
                        Transformation = new Transformation().Crop("limit").Width(1000).Height(1000)
                    };
                    var uploadResult = await cloudinary.UploadAsync(uploadParams);
                    imageUrl = uploadResult.Url.ToString();
                }
                var customer = new MstCustomer
                {
                    Name = input.Name,
                    Image = imageUrl,
                    Address = input.Address,
                    Phone = input.Phone,
                    DoB = input.DoB,
                    Sex = input.Sex,
                    Email = input.Email,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(input.password)),
                    PasswordSalt = hmac.Key,
                    RankId = 1
                };

                _context.Add(customer);
                await _context.SaveChangesAsync();
                response.Status = true; response.Code = 200; response.Message = "Success";
                response.Data = customer;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }

            return response;
        }

        private async Task<bool> CustomerExists(string input)
        {
            return await _context.MstCustomer.AnyAsync(e => e.Email == input || e.Phone == input);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(CustomerLoginDto input)
        {
            var customer = await _context.MstCustomer.FirstOrDefaultAsync(e => e.Email == input.email);
            var hmac = new HMACSHA512(customer.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(input.password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != customer.PasswordHash[i]) return CustomResult(false);
            }
            try
            {
                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.NameId, customer.Id.ToString())
                };
                var accessToken = _tokenService.GenerateAccessToken(claims);
                var refreshToken = _tokenService.GenerateRefreshToken();
                customer.RefreshToken = refreshToken;
                customer.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);
                var result = new CustomerResultLogin(customer.Email, accessToken, refreshToken);
                await _context.SaveChangesAsync();
               
                return CustomResult(result);
            }
            catch (Exception ex)
            {
                return CustomResult(ex.Message);
            }
        }
    }
}
