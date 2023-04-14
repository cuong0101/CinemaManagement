
using CinemaManagement.Data;
using CinemaManagement.DTOs;
using CinemaManagement.Entities;
using CinemaManagement.Interfaces;
using Dapper;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("Register")]
        public async Task<string> Register(CustomerRegisterDto cusRegister)
        {
            var hmac = new HMACSHA512();
            if (CustomerExists(cusRegister.Email).Result) throw new System.Exception("Email is taken");
            //var cus = new Customer()
            //{
            //    Name = cusRegister.Name,
            //    Image = cusRegister.Image,
            //    Address = cusRegister.Address,
            //    Phone = cusRegister.Phone,
            //    DoB = cusRegister.DoB,
            //    Sex = cusRegister.Sex,
            //    Email = cusRegister.Email,
            //    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(cusRegister.password)),
            //    PasswordSalt = hmac.Key
            //};
            return "a";
        }

        private async Task<bool> CustomerExists (string email)
        {
            using (var conn = _dapper.CreateConnection())
            {
                var cus = await conn.QueryAsync<CustomerDto>(@"
                Select count(Id) from MstCustomer where isDeleted = 0 and email = N'"+email+"'");
                if (cus.ToList().Count > 0)
                    return true;
                else
                    return false;
            }
        }
    }
}
