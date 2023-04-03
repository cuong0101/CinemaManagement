using CinemaManagement.Data;
using CinemaManagement.DTOs;
using CinemaManagement.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CinemaManagement.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;

        public AccountController(DataContext context)
        {
            _context=context;
        }
        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register([FromBody]RegisterDto registerDto)
        {
            using var hmac = new HMACSHA512();
            var user = new AppUser()
            {
                UserName = registerDto.username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.password)),
                PasswordSalt = hmac.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return  user;
        }
        //public async Task<bool> UsersExists(string username)
        //{
        //    return await _context.Users.AnyAsync(e => e.UserName == username);
        //}
    }
}
