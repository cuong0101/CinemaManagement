using CinemaManagement.Data;
using CinemaManagement.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace CinemaManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController
    {
        private readonly DataContext _dataContext;
        public UsersController(DataContext dataContext) {  _dataContext = dataContext; }
        [HttpGet]
        public List<AppUser> GetAll()
        {
            var users = _dataContext.Users.ToList();
            var query = (from appUser in users
                        select new AppUser
                        {
                            Id = appUser.Id,
                            Username = appUser.Username,
                        }).ToList();
            return query;
        }
    }
}
