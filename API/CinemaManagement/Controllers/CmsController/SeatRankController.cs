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
using System.Xml.Linq;
using Dapper;

namespace CinemaManagement.Controllers.CmsController
{
    [Authorize]
    public class SeatRankController : BaseApiController
    {
        private readonly DataContext _dataContext;
        private readonly DapperContext _dapper;
        public SeatRankController(DataContext dataContext, IMapper mapper) : base(mapper)
        {
            _dataContext = dataContext;
        }
        [AllowAnonymous]
        [HttpGet("getAll")]
        public async Task<List<SeatRankDto>> GetAll()
        {
            var seatranks = _dataContext.MstSeatRank.ToList();
            var query = (from appseatrank in seatranks
                         select new SeatRankDto
                         {
                             Id = appseatrank.Id,
                             Name = appseatrank.Name,
                             Description = appseatrank.Description,
                         }).ToList();
            return query;
        }
        [AllowAnonymous]

        [HttpGet("{id}", Name = "GetSeatRankById")]
        public async Task<RoomDto> GetUser(long id)
        {
            using (var conn = _dapper.CreateConnection())
            {
                var cus = await conn.QueryAsync<RoomDto>(@"
                Select * from MstRooms where isDeleted = 0 and id = " + id);
                return cus.FirstOrDefault();
            }
        }
        [HttpPost("createOrEdit")]

        public async Task CreateOrEdit(SeatRankDto createOrEdit)
        {
            if (createOrEdit.Id == null)
            {
                await Create(createOrEdit);
            }
            else await Edit(createOrEdit);
        }
        private async Task Create(SeatRankDto createOrEdit)
        {
            var Name = _dataContext.MstSeatRank.FirstOrDefault(e => e.Name.ToLower() == createOrEdit.Name.ToLower());
            if (Name != null)
            {
                throw new UserFriendlyException("Đã tồn tại seat rank");
            }
            else
            {
                var seatrank = _mapper.Map<MstSeatRank>(createOrEdit);
                seatrank.Name = createOrEdit.Name;
                seatrank.Description = createOrEdit.Description;
                _dataContext.MstSeatRank.Add(seatrank);
                await _dataContext.SaveChangesAsync();
            }
        }
        private async Task Edit(SeatRankDto seatRankDto)
        {
            var name = _dataContext.MstSeatRank.FirstOrDefault(e => e.Id == seatRankDto.Id);
            var seatrank = _mapper.Map(seatRankDto, name);
            seatrank.Name = seatRankDto.Name;
            seatrank.Description = seatRankDto.Description;
            _dataContext.MstSeatRank.Update(seatrank);
            await _dataContext.SaveChangesAsync();
        }
        [HttpDelete("delete/{id}", Name = "deleted")]
        public async Task Delete(long Id)
        {
            var seatRank = _dataContext.MstSeatRank.FirstOrDefault(e => e.Id == Id);
            //seatRank.IsDeleted = false;
            _dataContext.MstSeatRank.Remove(seatRank);
            await _dataContext.SaveChangesAsync();
        }
    }
    
}
