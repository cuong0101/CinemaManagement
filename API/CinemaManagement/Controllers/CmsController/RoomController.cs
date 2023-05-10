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
using CinemaManagement.Entities;
using Abp.UI;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Text;
using System.Xml.Linq;

namespace CinemaManagement.Controllers.CmsController
{
   
    public class RoomController : BaseApiController
    {
        private readonly DataContext _dataContext;
        private readonly DapperContext _dapper;
        public RoomController(DataContext dataContext, DapperContext dapper, IMapper mapper) : base(mapper)
        {
            _dataContext = dataContext;
            _dapper = dapper;
        }
        [AllowAnonymous]
        [HttpGet("GetAll")]
        public async Task<List<RoomDto>> GetAll()
        {
            using (var conn = _dapper.CreateConnection())
            {
                var cus = await conn.QueryAsync<RoomDto>(@"
                Select * from MstRooms where isDeleted = 0");
                return cus.ToList();
            }
        }
        [HttpGet("{id}", Name = "GetRoomById")]
        public async Task<RoomDto> GetUser(long id)
        {
            using (var conn = _dapper.CreateConnection())
            {
                var cus = await conn.QueryAsync<RoomDto>(@"
                Select * from MstRooms where isDeleted = 0 and id = "+id);
                return cus.FirstOrDefault();
            }
        }

        [HttpPost("createOrEdit")]

        public async Task CreateOrEdit(RoomDto createOrEdit)
        {
            if (createOrEdit.Id == null)
            {
                await Create(createOrEdit);
            }
            else await Edit(createOrEdit);
        }
        private async Task Create(RoomDto createOrEdit)
        {
            var Name = _dataContext.MstRooms.FirstOrDefault(e => e.Name.ToLower() == createOrEdit.Name.ToLower());
            if (Name != null)
            {
                throw new UserFriendlyException("Đã tồn tại Room");
            }
            else
            {
                var room = _mapper.Map<MstRoom>(createOrEdit);
                room.Name = createOrEdit.Name;
                room.Description = createOrEdit.Description;
                _dataContext.MstRooms.Add(room);
                await _dataContext.SaveChangesAsync();
            }
        }
        private async Task Edit(RoomDto roomDto)
        {
            var name = _dataContext.MstRooms.FirstOrDefault(e => e.Id == roomDto.Id);
            var room = _mapper.Map(roomDto, name);
            room.Name = roomDto.Name;
            room.Description = roomDto.Description;
            _dataContext.MstRooms.Update(room);
            await _dataContext.SaveChangesAsync();
        }
        [HttpDelete("delete/{id}", Name = "DeleteRoom")]
        public async Task Delete(long Id)
        {
            var room = _dataContext.MstRooms.FirstOrDefault(e => e.Id == Id);
            _dataContext.MstRooms.Remove(room);
            await _dataContext.SaveChangesAsync();
        }

    }
}
