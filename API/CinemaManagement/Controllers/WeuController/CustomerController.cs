
using Abp.Runtime.Session;
using CinemaManagement.Data;
using CinemaManagement.DTOs;
using CinemaManagement.Entities;
using CinemaManagement.Interfaces;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CinemaManagement.Controllers.WeuController
{
    public class CustomerController : BaseApiCusController
    {
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
        public async Task<string> GetMyInfo()
        {
            return "a";
        }

        [HttpPost("Register")]
        public async Task<ActionResult<string>> Register(CustomerRegisterDto input)
        {
            var hmac = new HMACSHA512();
            if (CustomerExists(input.Email).Result)
                return BadRequest("Email is taken");
            if (CustomerExists(input.Phone).Result)
                return BadRequest("Phone number is taken");
            if (input.password != input.repassword)
                return BadRequest("Passwords are not same");

            var customer = new MstCustomer
            {
                Name = input.Name,
                Image = input.Image,
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
            return "Register successfully";
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
            return new UserDto()
            {
                Username = customer.Name,
                //Token = _tokenService.CreateToken(customer)
            };
        }
    }
}
