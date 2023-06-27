using Abp.UI;
using AutoMapper;
using CinemaManagement.Data;
using CinemaManagement.DTOs.CmsDtos;
using CinemaManagement.DTOs.CmsDtos.BookingDtos;
using CinemaManagement.DTOs.CmsDtos.ShowTime;
using CinemaManagement.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaManagement.Controllers.CmsController
{
    public class BookingController : BaseApiController_new
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly DapperContext _dapper;

        public BookingController(DataContext context, ITokenService tokenService, DapperContext dapper, IMapper mapper) : base(mapper)
        {
            _context = context;
            _tokenService = tokenService;
            _dapper = dapper;
        }

        [HttpPost("AdminCheckTicket")]
        //Kiểm tra vé đã được chọn bởi người khác chưa?
        // nếu chưa đổi trạng thái vé sang 2
        //Hoàn cảnh: khi đang bấm chọn ghế -> bấm đặt vé -> thay đổi trạng thái các vé đc chọm
        // để người khác k chọn được
        public async Task<IActionResult> AdminCheckTicket(ListTicketInputDto input)
        {
            foreach (var idmovie in input.listticket)
            {
                var ticket = _context.MstTicket
                    .Where(e => e.IsDeleted == false && e.Id == idmovie).FirstOrDefault();

                if (ticket.Status != 0)
                {
                    return CustomResult(false);
                }

                ticket.Status = 2;
                ticket.EmployeeId = input.PersonId;
                ticket.LastModificationTime = DateTime.Now;
                _context.MstTicket.Update(ticket);
                await _context.SaveChangesAsync();
            }
            return CustomResult(true);
        }

        [HttpPost("AdminBooking")]
        public async Task<IActionResult> AdminBooking(ListTicketInputDto input)
        {
            try
            {
                foreach (var idmovie in input.listticket)
                {
                    var ticket = _context.MstTicket
                       .Where(e => e.IsDeleted == false && e.Id == idmovie).FirstOrDefault();

                    ticket.Status = 1; // 1 là đã được mua
                    ticket.EmployeeId = input.PersonId;
                    ticket.LastModificationTime = DateTime.Now;
                    _context.MstTicket.Update(ticket);
                    await _context.SaveChangesAsync();
                }
                return CustomResult(true);
            }
            catch (Exception ex)
            {
                foreach (var idmovie in input.listticket)
                {
                    var ticket = _context.MstTicket
                       .Where(e => e.IsDeleted == false && e.Id == idmovie).FirstOrDefault();

                    ticket.Status = 0; // 1 là đã được mua
                    ticket.EmployeeId = null;
                    ticket.LastModificationTime = DateTime.Now;
                    _context.MstTicket.Update(ticket);
                    await _context.SaveChangesAsync();
                }

                return CustomResult(false);
            }

        }

        [HttpPost("CustomerCheckTicket")]
        public async Task<IActionResult> CustomerCheckTicket(ListTicketInputDto input)
        {
            foreach (var idmovie in input.listticket)
            {
                var ticket = _context.MstTicket
                    .Where(e => e.IsDeleted == false && e.Id == idmovie).FirstOrDefault();

                if (ticket.Status != 0)
                {
                    return CustomResult(false);
                }

                ticket.Status = 2;
                ticket.CustomerId = input.PersonId;
                ticket.LastModificationTime = DateTime.Now;
                _context.MstTicket.Update(ticket);
                await _context.SaveChangesAsync();
            }
            return CustomResult(true);
        }

        [HttpPost("CustomerBooking")]
        public async Task<IActionResult> CustomerBooking(ListTicketInputDto input)
        {
            try
            {
                foreach (var idmovie in input.listticket)
                {
                    var ticket = _context.MstTicket
                       .Where(e => e.IsDeleted == false && e.Id == idmovie).FirstOrDefault();

                    ticket.Status = 1; // 1 là đã được mua
                    ticket.CustomerId = input.PersonId;
                    ticket.LastModificationTime = DateTime.Now;
                    _context.MstTicket.Update(ticket);
                    await _context.SaveChangesAsync();
                }
                return CustomResult(true);
            }
            catch (Exception ex)
            {
                foreach (var idmovie in input.listticket)
                {
                    var ticket = _context.MstTicket
                       .Where(e => e.IsDeleted == false && e.Id == idmovie).FirstOrDefault();

                    ticket.Status = 0; // 1 là đã được mua
                    ticket.CustomerId = null;
                    ticket.LastModificationTime = DateTime.Now;
                    _context.MstTicket.Update(ticket);
                    await _context.SaveChangesAsync();
                }
                return CustomResult(false);
            }

        }
        [HttpPost("CancelBooking")]
        public async Task<IActionResult> CancelBooking(ListTicketInputDto input)
        {
            foreach (var idmovie in input.listticket)
            {
                var ticket = _context.MstTicket
                   .Where(e => e.IsDeleted == false && e.Id == idmovie).FirstOrDefault();

                ticket.Status = 0; // 1 là đã được mua
                ticket.CustomerId = null;
                ticket.EmployeeId = null;
                ticket.LastModificationTime = DateTime.Now;
                _context.MstTicket.Update(ticket);
                await _context.SaveChangesAsync();
            }
            return CustomResult(true);
        }


        //tìm các phim theo ngày chiếu (chọn ngày chiếu)
        [HttpGet("GetMovieByStartTime")]
        public async Task<List<MovieDto>> getMovieByStartTime(DateTime startTime)
        {
            var movies = await (
                from movie in _context.MstMovie
                .Where(e => e.IsDeleted == false)
                join shows in _context.MstShowTimes
                .Where(e => e.IsDeleted == false && e.StartTime.Date == startTime.Date)
                on movie.Id equals shows.MovieId

                select new MovieDto
                {
                    Id = movie.Id,
                    Name = movie.Name
                }
           ).Distinct().ToListAsync();

            return movies;
        }
        [HttpGet("GetShowTimeByMovieAndDate")]

        public async Task<List<InfoShowtimeDto>> GetShowTimeByMovieAndDate(DateTime startTime, long idmovie)
        {
            var shows = await (from showtime in _context.MstShowTimes
                               .Where(e => e.IsDeleted == false && e.MovieId == idmovie && e.StartTime.Date == startTime.Date)

                               select new InfoShowtimeDto
                               {
                                   Id = showtime.Id,
                                   StartTime = showtime.StartTime.ToString("HH:mm"),
                                   IdMovie = showtime.MovieId,
                                   IdRoom = showtime.RoomId
                               }).ToListAsync();
            return shows;
        }

        [HttpGet("GetTicketByShowtimeAdmin")]
        public async Task<List<InfoTicketDto>> GetTicketByShowtimeAdmin(long idshow)
        {
            var tickets = await (from ticket in _context.MstTicket.Where(e => e.IsDeleted == false)
                                 join showtime in _context.MstShowTimes.Where(e => e.IsDeleted == false && e.Id == idshow)
                                 on ticket.ShowTimeId equals showtime.Id
                                 join seat in _context.MstSeats.Where(e => e.IsDeleted == false)
                                 on ticket.SeatId equals seat.Id
                                 join seatrank in _context.MstSeatRank.Where(e => e.IsDeleted == false)
                                 on seat.IdSeatRank equals seatrank.Id

                                 select new InfoTicketDto
                                 {
                                     id = ticket.Id,
                                     location = seat.Row + seat.Column + "",
                                     seatrank = seatrank.Name,
                                     price = ticket.Price,
                                     idShowtime = showtime.Id,
                                     status = ticket.Status
                                 }).ToListAsync();
            return tickets;
        }

        [HttpGet("getMovieInfor")]
        public async Task<List<MovieDto>> getMovieInfor(DateTime? startTime, string namemovie)
        {
            var movies = await (
                from movie in _context.MstMovie
                .Where(e => e.IsDeleted == false)
                .Where(e => string.IsNullOrWhiteSpace(namemovie) || e.Name.Contains(namemovie))

                join show in _context.MstShowTimes
                .Where(e =>  !startTime.HasValue || e.StartTime.Date == startTime.Value.Date)
                on movie.Id equals show.MovieId
               
                join room in _context.MstRooms
                on show.RoomId equals room.Id
                
                select new MovieDto
                {
                    Id = show.Id,
                    Name = movie.Name,
                    StartDate = show.StartTime,
                    StartTime = show.StartTime.ToShortTimeString(),
                    Time = movie.Time,
                    RoomName = room.Name
                }).ToListAsync();

            return movies;
        }


        [HttpGet("getChangeGift")]
        public async Task<List<ChangeGiftDto>> getChangeGift()
        {
            var query = (from change in _context.HistoryChangeGift
                         join cus in _context.MstCustomer
                         on change.CusId equals cus.Id
                         join gift in _context.PolicyGift
                         on change.GiftId equals gift.Id
                         select new ChangeGiftDto
                         {
                             Id = change.Id,
                             cusId = cus.Id,
                             giftId = gift.Id,
                             phoneCus = cus.Phone,
                             giftName = gift.GiftName
                         }).ToList();
            return query;
        }
    }
}
