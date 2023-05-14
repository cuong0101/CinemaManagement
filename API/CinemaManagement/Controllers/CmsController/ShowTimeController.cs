using AutoMapper;
using CinemaManagement.Controllers.CMSController;
using CinemaManagement.Data;
using CinemaManagement.DTOs;
using CinemaManagement.DTOs.CmsDtos.ShowTime;
using CinemaManagement.Entities;
using CinemaManagement.Interfaces;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaManagement.Controllers.CmsController
{
    public class ShowTimeController : BaseApiController_new
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly DapperContext _dapper;

        public ShowTimeController(DataContext context, ITokenService tokenService, DapperContext dapper, IMapper mapper) : base(mapper)
        {
            _context = context;
            _tokenService = tokenService;
            _dapper = dapper;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> getAll()
        {
            using (var conn = _dapper.CreateConnection())
            {
                var showtimes = await conn.QueryAsync<ShowTimeDto>(@"
                    SELECT 
	                s.Id, 
	                s.StartTime StartDate,
	                CAST(CAST(s.StartTime AS TIME) AS VARCHAR) StartTime,
	                CAST(m.Time AS VARCHAR) Time,
	                m.Name MovieName, 
	                c.Name RoomName
                FROM dbo.MstShowTimes s
                INNER JOIN dbo.MstMovie m ON s.MovieId = m.Id
                INNER JOIN dbo.MstRooms c ON s.RoomId = c.Id
                WHERE c.IsDeleted = 0 AND m.IsDeleted = 0
                AND s.IsDeleted = 0");
                return CustomResult(showtimes.ToList());
            }
        }

        private async Task AddShowTime(AddShowTime showtime)
        {
            var show = _mapper.Map<MstShowTime>(showtime);
            _context.MstShowTimes.Add(show);
            await _context.SaveChangesAsync();
        }

        private async Task EditShowTime(AddShowTime showtime)
        {
            var temp = _context.MstShowTimes.FirstOrDefault(e => e.Id == showtime.Id);
            var show = _mapper.Map(showtime, temp);
            _context.MstShowTimes.Update(show);
        }

        [HttpPost("CreateOrEdit")]
        public async Task CreateOrEdit (AddShowTime showtime)
        {
            if (showtime.Id == null)
                await AddShowTime(showtime);
            else
                await EditShowTime(showtime);
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task Delete ([Required]long id)
        {
            var show = _context.MstShowTimes.FirstOrDefault(e => e.Id == id);
            show.IsDeleted = true;
            _context.MstShowTimes.Update(show);
            await _context.SaveChangesAsync();
        }

        [HttpGet("GetAllMovie")]
        public async Task<List<MstMovie>> getMovieList()
        {
            return _context.MstMovie.Where(e=>e.IsDeleted == false).ToList();
        }

    }
}
