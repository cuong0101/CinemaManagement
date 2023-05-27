using AutoMapper;
using CinemaManagement.Controllers.CMSController;
using CinemaManagement.Data;
using CinemaManagement.DTOs;
using CinemaManagement.DTOs.CmsDtos;
using CinemaManagement.DTOs.CmsDtos.MstPromotionDto;
using CinemaManagement.DTOs.CmsDtos.ShowTime;
using CinemaManagement.Entities;
using CinemaManagement.Interfaces;
using CinemaManagement.Migrations;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using CinemaManagement.DTOs.CmsDtos.ShowTime;
using MstShowTime = CinemaManagement.Entities.MstShowTime;
using System;
using Abp.Linq.Extensions;
using MstRoom = CinemaManagement.Entities.MstRoom;
using NUglify.Helpers;

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
        public async Task<List<ShowTimeDto>> getAll()
        {
            using (var conn = _dapper.CreateConnection())
            {
                var showtimes = await conn.QueryAsync<ShowTimeDto>(@"
                    SELECT 
	                s.Id, 
	                s.StartTime StartTime,
	                DATEADD(MINUTE,m.Time,s.StartTime) EndTime,
                    m.Id IdMovie,
                    c.Id IdRoom,
                    m.Name MovieName,
                    c.Name RoomName
                FROM dbo.MstShowTimes s
                INNER JOIN dbo.MstMovie m ON s.MovieId = m.Id
                INNER JOIN dbo.MstRooms c ON s.RoomId = c.Id
                WHERE c.IsDeleted = 0 AND m.IsDeleted = 0
                AND s.IsDeleted = 0");
                return showtimes.ToList();
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
        public async Task CreateOrEdit(AddShowTime showtime)
        {
            if (showtime.Id == null)
                await AddShowTime(showtime);
            else
                await EditShowTime(showtime);
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task Delete([Required] long id)
        {
            var show = _context.MstShowTimes.FirstOrDefault(e => e.Id == id);
            show.IsDeleted = true;
            _context.MstShowTimes.Update(show);
            await _context.SaveChangesAsync();
        }

        [HttpGet("GetAllMovie")]
        public async Task<List<MstMovie>> getRoomList()
        {
            return _context.MstMovie.Where(e => e.IsDeleted == false).ToList();
        }

        [HttpGet("GetAllRoom")]
        public async Task<List<MstRoom>> getMovieList()
        {
            return _context.MstRooms.Where(e => e.IsDeleted == false).ToList();
        }


        [HttpGet("GetTicketByShowTime")]
        public async Task<List<SearchTicketByShowTime>> SearchAllTicketByShowTime(DateTime? date, string MovieName)
        {

            List<SearchTicketByShowTime> result = await (
            from sh in _context.MstShowTimes.AsNoTracking()
            .Where(e => e.IsDeleted == false)
            .Where(e => !date.HasValue || date.Value.Date == e.StartTime.Date)
            join m in _context.MstMovie.AsNoTracking()
            .Where(e => e.IsDeleted == false)
            .Where(e => string.IsNullOrEmpty(MovieName) || e.Name.Contains(MovieName))
            on sh.MovieId equals m.Id
            join r in _context.MstRooms.AsNoTracking().Where(e => e.IsDeleted == false)
            on sh.RoomId equals r.Id
            select new SearchTicketByShowTime
            {
                Id = sh.Id,
                StartDate = sh.StartTime,
                StartTime = sh.StartTime.ToString("hh:mm"),
                MovieName = m.Name,
                RoomName = r.Name,
                listTicket = (
                    from s in _context.MstSeats.AsNoTracking().Where(e => e.IsDeleted == false)
                    join t in _context.MstTicket.AsNoTracking().Where(e => e.IsDeleted == false && e.ShowTimeId == sh.Id)
                    on s.Id equals t.SeatId
                    join sr in _context.MstSeatRank.AsNoTracking().Where(e => e.IsDeleted == false)
                    on s.IdSeatRank equals sr.Id
                    select new TicketByShowTime 
                    {
                        Id = t.Id,
                        Row = s.Row,
                        Column = s.Column,
                        Location = s.Row + s.Column,
                        SeatRankName = sr.Name,
                        Status = t.Status,
                        Price = t.Price
                    }).ToList(),
            }).ToListAsync();

            return result;
        }

        [HttpPost("UpdateTicketStatus")]
        public async Task UpdateTicketStatus(List<long?> tickets)
        {
            var ticketRepo = _context.MstTicket.ToList();
            var ticketForUpdate = ticketRepo.Where(e => tickets.Any(p => p == e.Id));
            ticketForUpdate.ForEach(e => e.Status = 1);
            _context.MstTicket.UpdateRange(ticketForUpdate);
            await _context.SaveChangesAsync();
        }

    }
}
