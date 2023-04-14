using Abp.Dapper.Repositories;
using CinemaManagement.DTOs;
using CinemaManagement.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaManagement.Controllers
{
    public class CustomerController : BaseApiController
    {
        private readonly IDapperRepository<AppUser, int> _dapper;

        public CustomerController(IDapperRepository<AppUser, int> dapper)
        {
            _dapper = dapper;
        }

        [HttpGet]
        public async Task<List<CustomerDto>> GetAll()
        {
            IEnumerable<CustomerDto> customer = await _dapper.QueryAsync<CustomerDto>(@"
            Select * from MstCustomer    
            ");
            return customer.ToList();
        }
    }
}
