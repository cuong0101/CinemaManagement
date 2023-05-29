using AutoMapper;
using CinemaManagement.Controllers.CmsController;
using CinemaManagement.Data;
using CinemaManagement.DTOs.CmsDtos.ShowTime;
using CinemaManagement.DTOs.WeuDtos;
using CinemaManagement.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaManagement.Controllers.WeuController
{
    public class ShowtimeInfoController : BaseApiController_new
    {
        private readonly DataContext _context;
        private readonly DapperContext _dapper;

        public ShowtimeInfoController(DataContext context, DapperContext dapper, IMapper mapper) : base(mapper)
        {
            _context = context;
            _dapper = dapper;
        }

        [HttpGet("getListShowTime")]
        public async Task<IActionResult> getListShowTime(DateTime? date, string MovieName)
        {
            var res = await (from sh in _context.MstShowTimes.AsNoTracking()
                      .Where(e => e.IsDeleted == false)
                      .Where(e => !date.HasValue || date.Value.Date == e.StartTime.Date)
                             join m in _context.MstMovie.AsNoTracking()
                             .Where(e => e.IsDeleted == false)
                             .Where(e => string.IsNullOrEmpty(MovieName) || e.Name.Contains(MovieName))
                             on sh.MovieId equals m.Id
                             join r in _context.MstRooms.AsNoTracking()
                            .Where(e => e.IsDeleted == false)
                             on sh.RoomId equals r.Id
                             select new ShowTimeDto
                             {
                                 Id = sh.Id,
                                 StartTime = sh.StartTime,
                                 IdMovie = m.Id,
                                 IdRoom = r.Id,
                                 MovieName = m.Name,
                                 RoomName = r.Name
                             }).ToListAsync();

            return CustomResult(res);
        }

        [HttpGet("getListTicketByShowTime")]

        public async Task<IActionResult> getListSeatByShowTime(long IdShowTime)
        {
            var ticket = (from tick in _context.MstTicket
                          .Where(e=>e.IsDeleted == false)
                          join show in _context.MstShowTimes
                          .Where(e=>e.IsDeleted == false && e.Id == IdShowTime)
                          on tick.ShowTimeId equals show.Id
                          join seat in _context.MstSeats 
                          .Where(e=>e.IsDeleted == false)
                          on tick.SeatId equals seat.Id
                          join sr in _context.MstSeatRank
                          .Where(e=>e.IsDeleted == false)
                          on seat.IdSeatRank equals sr.Id

                          select new TicketDto
                          {
                              Id = tick.Id,
                              Location = seat.Row + seat.Column,
                              Status = tick.Status,
                              Price = tick.Price,
                              CustomerId = tick.CustomerId,
                              EmpoyeeId = tick.EmployeeId,
                              SeatRankName = sr.Name
                          }).ToList();
            return CustomResult(ticket);
        }
    }
}
