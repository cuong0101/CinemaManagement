using Abp.UI;
using AutoMapper;
using CinemaManagement.Controllers.CmsController;
using CinemaManagement.Data;
using CinemaManagement.DTOs;
using CinemaManagement.DTOs.CmsDtos;
using CinemaManagement.Entities;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CinemaManagement.Controllers.CMSController
{
    [Authorize]
    public class UsersController : BaseApiController_new
    {
        private readonly DataContext _dataContext;
        private readonly DapperContext _dapper;

        public UsersController(DataContext dataContext, IMapper mapper, DapperContext dapper) : base(mapper)
        {
            _dataContext = dataContext;
            _dapper=dapper;
        }
        //[AllowAnonymous]
        [HttpGet("getAll")]
        public async Task<List<UserManagementDto>> GetAll()
        {
            var users = _dataContext.Users.ToList();
            var query = (from appUser in users
                         select new UserManagementDto
                         {
                             Id = appUser.Id,
                             UserName = appUser.UserName,
                         }).ToList();
            return query;
        }
        [HttpGet("{id}", Name = "GetUserById")]
        public async Task<ActionResult<AppUser>> GetUser(long id)
        {
            return _dataContext.Users.Find(id);
        }
        [HttpPost("createOrEdit")]
        public async Task CreateOrEdit(UserManagementDto createOrEdit)
        {
            if (createOrEdit.Id == null)
            {
                await Create(createOrEdit);
            }
            else await Edit(createOrEdit);
        }
        private async Task Create(UserManagementDto createOrEdit)
        {
            var username = _dataContext.Users.FirstOrDefault(e => e.UserName.ToLower() ==  createOrEdit.UserName.ToLower());
            if (username != null)
            {
                throw new UserFriendlyException("Đã tồn tại username");
            }
            else
            {
                using var hmac = new HMACSHA512();
                var user = _mapper.Map<AppUser>(createOrEdit);
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(createOrEdit.Password));
                user.PasswordSalt = hmac.Key;
                _dataContext.Users.Add(user);
                await _dataContext.SaveChangesAsync();
            }
        }
        private async Task Edit(UserManagementDto userManagementDto)
        {
            using var hmac = new HMACSHA512();
            var username = _dataContext.Users.FirstOrDefault(e => e.Id ==  userManagementDto.Id);
            var user = _mapper.Map(userManagementDto, username);
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userManagementDto.Password));
            user.PasswordSalt = hmac.Key;
            _dataContext.Users.Update(user);
            await _dataContext.SaveChangesAsync();
        }
        [HttpDelete("{id}", Name = "delete-seatrank")]
        public async Task Delete(long Id)
        {
            var user = _dataContext.Users.FirstOrDefault(e => e.Id == Id);
            user.IsDeleted = false;
            _dataContext.Users.Remove(user);
            await _dataContext.SaveChangesAsync();
        }

        [HttpGet("getMyEmpInfo")]
        public async Task<IActionResult> GetMyEmpInfo()
        {
            var username = HttpContext.User.FindFirst(ClaimTypes.Name).Value;

            using (var conn = _dapper.CreateConnection())
            {
                var emp = await conn.QueryAsync<AppUser>(@"
                Select * from users where isDeleted = 0 and username = @username", new { username = username });
                return CustomResult(emp.FirstOrDefault());
            }
        }

    }
}
