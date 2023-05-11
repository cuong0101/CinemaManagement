using AutoMapper;
using CinemaManagement.Controllers.CMSController;
using CinemaManagement.Data;
using CinemaManagement.DTOs.CmsDtos;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Dapper;
using Abp.UI;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Text;
using System.Xml.Linq;
using CinemaManagement.Migrations;
using System.ComponentModel.DataAnnotations.Schema;
using CinemaManagement.Entities.seat;

namespace CinemaManagement.Controllers.CmsController
{
    public class SeatController : BaseApiController
    {
        private readonly DataContext _dataContext;
        private readonly DapperContext _dapper;
        public SeatController(DataContext dataContext, DapperContext dapper, IMapper mapper) : base(mapper)
        {
            _dataContext = dataContext;
            _dapper = dapper;
        }
        [AllowAnonymous]
        [HttpGet("GetAll")]
        public async Task<List<GetAllSeatDto>> GetAll()
        {
            using (var conn = _dapper.CreateConnection())
            {
                var cus = await conn.QueryAsync<GetAllSeatDto>(@"
                select s.Id, s.Row, s.[column] as [Column], r.Name as [NameRoom], sr.Name as [NameSeatRank] from (MstSeats as s inner join MstSeatRank as sr on s.IdSeatRank = sr.Id) inner join MstRooms as r on s.IdRoom = r.id
                WHERE s.IsDeleted = 0");
                return cus.ToList();
            }
        }
 //       select s.Row, s.[column] as [Column], r.Name as [Room], sr.Name as [SeatRank] from (MstSeats as s inner join MstSeatRank as sr on s.IdSeatRank = sr.Id) inner join MstRooms as r on s.IdRoom = r.id
 //WHERE s.IsDeleted = 0;
        [HttpGet("{id}", Name = "GetSeatById")]
        public async Task<SeatDto> GetUser(long id)
        {
            using (var conn = _dapper.CreateConnection())
            {
                var cus = await conn.QueryAsync<SeatDto>(@"
                Select * from MstSeats where isDeleted = 0 and id = " + id);
                return cus.FirstOrDefault();
            }
        }

        [HttpPost("createOrEdit")]

        public async Task CreateOrEdit(SeatDto createOrEdit)
        {
            if (createOrEdit.Id == null)
            {
                await Create(createOrEdit);
            }
            else await Edit(createOrEdit);
        }
        private async Task Create(SeatDto createOrEdit)
        {
            var Row = _dataContext.MstSeats.FirstOrDefault(e => e.Row.ToLower() == createOrEdit.Row.ToLower());
            var Column = _dataContext.MstSeats.FirstOrDefault(e => e.Column.ToLower() == createOrEdit.Column.ToLower());
            var IdRoom = _dataContext.MstSeats.FirstOrDefault(e => e.IdRoom == createOrEdit.IdRoom);
            var IdSeatRank = _dataContext.MstSeats.FirstOrDefault(e => e.IdSeatRank == createOrEdit.IdSeatRank);


            if (Row != null && Column !=null && IdRoom != null && IdSeatRank != null)
            {
                throw new UserFriendlyException("Đã tồn tại Saet");
            }
            else
            {
                var seat = _mapper.Map<Entities.seat.MstSeat>(createOrEdit);
                seat.Row = createOrEdit.Row;
                seat.Column = createOrEdit.Column;
                seat.IdRoom = (int?)createOrEdit.IdRoom;
                seat.IdSeatRank = (int?)createOrEdit.IdSeatRank;
                _dataContext.MstSeats.Add(seat);
                await _dataContext.SaveChangesAsync();
            }
        }
        private async Task Edit(SeatDto SeatDto)
        {
            var row = _dataContext.MstSeats.FirstOrDefault(e => e.Id == SeatDto.Id);
            var seat = _mapper.Map(SeatDto, row);
            seat.Row = SeatDto.Row;
            seat.Column = SeatDto.Column;
            seat.IdRoom = (int?)SeatDto.IdRoom;
            seat.IdSeatRank = (int?)SeatDto.IdSeatRank;
            _dataContext.MstSeats.Update(seat);
            await _dataContext.SaveChangesAsync();
        }
        [HttpDelete("delete/{id}", Name = "DeleteSeat")]
        public async Task Delete(long Id)
        {
            var seat = _dataContext.MstSeats.FirstOrDefault(e => e.Id == Id);
            _dataContext.MstSeats.Remove(seat);
            await _dataContext.SaveChangesAsync();
        }

    }
}
