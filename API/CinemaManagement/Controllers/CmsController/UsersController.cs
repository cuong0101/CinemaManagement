using AutoMapper;
using CinemaManagement.Data;
using CinemaManagement.DTOs.CmsDtos;
using CinemaManagement.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaManagement.Controllers.CMSController
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly DataContext _dataContext;
        public UsersController(DataContext dataContext, IMapper mapper):base(mapper)
        {
            _dataContext = dataContext; 
        }
        [AllowAnonymous]
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
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return _dataContext.Users.Find(id);
        }

        public async Task CreateOrEdit(UserManagementDto createOrEdit)
        {
            if (createOrEdit.Id == null)
            {
               await Create(createOrEdit);
            }
            else await Edit(createOrEdit);
        }
        private async Task<CmsCommonDto<object>> Create (UserManagementDto createOrEdit)
        {
            try
            {
                var username = _dataContext.Users.FirstOrDefault(e => e.UserName.ToLower() ==  createOrEdit.UserName.ToLower());
                if (username != null)
                {

                }
                else
                {
                    var user = _mapper.Map(createOrEdit, username);
                    _dataContext.Users.Add(user);
                    await _dataContext.SaveChangesAsync();
                }
            }
            
            
        }
        private async Task Edit(UserManagementDto userManagementDto)
        {
            var username = _dataContext.Users.FirstOrDefault(e => e.UserName.ToLower() ==  userManagementDto.UserName.ToLower());
            var user = _mapper.Map(userManagementDto, username);
            _dataContext.Users.Update(user);
            await _dataContext.SaveChangesAsync();

        }

    }
}
