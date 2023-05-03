using AutoMapper;
using CinemaManagement.Controllers.CMSController;
using CinemaManagement.Data;
using CinemaManagement.DTOs.CmsDtos;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.UI;
using CinemaManagement.DTOs;
using CinemaManagement.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Text;

namespace CinemaManagement.Controllers.CmsController
{
    public class SeatRankController : BaseApiController
    {
        private readonly DataContext _dataContext;
        public SeatRankController(DataContext dataContext, IMapper mapper) : base(mapper)
        {
            _dataContext = dataContext;
        }
        [HttpGet("getAll")]
        public async Task<List<SeatRankDto>> GetAll()
        {
            var seatranks = _dataContext.MstSeatRank.ToList();
            var query = (from appseatrank in seatranks
                         select new SeatRankDto
                         {
                             Id = appseatrank.Id,
                             Name = appseatrank.Name,
                         }).ToList();
            return query;
        }

    }
}
