
using CinemaManagement.Data;
using CinemaManagement.DTOs;
using CinemaManagement.Entities;
using CinemaManagement.Interfaces;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CinemaManagement.Controllers
{
    public class CustomerController : BaseApiController
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
            using(var conn = _dapper.CreateConnection())
            {
                var cus = await conn.QueryAsync<CustomerDto>(@"
                Select * from MstCustomer");
                return cus.ToList();
            }
        }

        [HttpPost("Register")]
        public async Task<string> Register(CustomerRegisterDto input)
        {
            var hmac = new HMACSHA512();
            if (CustomerExists(input.Email).Result) 
                throw new System.Exception("Email is taken");
            if(input.password != input.repassword)
                throw new System.Exception("Passwords are not same");
            using (var conn = _dapper.CreateConnection())
            {
                try
                {
                    await conn.ExecuteScalarAsync<CustomerDto>(@"
                Insert into MstCustomer values (SYSDATETIME(),1,NULL,NULL,0,NULL,NULL,@name,@img,@add,@tel,@dob,
                @sex,@email,@passHash,@passSalt)", new
                    {
                        name = input.Name,
                        img = input.Image,
                        add = input.Address,
                        tel = input.Phone,
                        dob = input.DoB,
                        sex = input.Sex,
                        email = input.Email,
                        passHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(input.password)),
                        passSalt = hmac.Key
                    });
                }
                catch(Exception e)
                {
                    throw new System.Exception("ERROR!");
                }
                return "Add member successfully";
            }
        }

        private async Task<bool> CustomerExists (string email)
        {
            using (var conn = _dapper.CreateConnection())
            {
                var cus = await conn.QueryAsync<int>(@"
                Select count(Id) from MstCustomer where isDeleted = 0 and email = N'"+email+"'");
                if (cus.FirstOrDefault() > 0)
                    return true;
                else
                    return false;
            }
        }

        [HttpPost("Login")]
        public async Task<string> Login(CustomerLoginDto input)
        {
            var hmac = new HMACSHA512();
            if (CustomerExists(input.Email).Result)
                throw new System.Exception("Email is taken");
            if (input.password != input.repassword)
                throw new System.Exception("Passwords are not same");
            using (var conn = _dapper.CreateConnection())
            {
                try
                {
                    await conn.ExecuteScalarAsync<CustomerDto>(@"
                Insert into MstCustomer values (SYSDATETIME(),1,NULL,NULL,0,NULL,NULL,@name,@img,@add,@tel,@dob,
                @sex,@email,@passHash,@passSalt)", new
                    {
                        name = input.Name,
                        img = input.Image,
                        add = input.Address,
                        tel = input.Phone,
                        dob = input.DoB,
                        sex = input.Sex,
                        email = input.Email,
                        passHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(input.password)),
                        passSalt = hmac.Key
                    });
                }
                catch (Exception e)
                {
                    throw new System.Exception("ERROR!");
                }
                return "Add member successfully";
            }
        }
    }
}
