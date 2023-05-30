using Abp.UI;
using AutoMapper;
using CinemaManagement.Data;
using CinemaManagement.DTOs.CmsDtos;
using CinemaManagement.DTOs.CmsDtos.ShowTime;
using CinemaManagement.Entities;
using CinemaManagement.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaManagement.Controllers.CmsController
{
    public class BookingController : BaseApiController_new
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly DapperContext _dapper;

        public BookingController(DataContext context, ITokenService tokenService, DapperContext dapper, IMapper mapper):base(mapper)
        {
            _context = context;
            _tokenService = tokenService;
            _dapper = dapper;
        }

        [HttpPost("BookingTicket")]
        public async Task AdminBookingTicket(List<long> listIdTicket, int action, long? IdCus)
        {
            //action 0: từ màn hình chọn vé, click vào nút đặt vé => trạng thái vé 0->1
            //action 1: từ màn thông tin đơn vé, click back => huỷ bỏ trạng thái vé 1->0
            //action 2: từ màn thông tin đơn vé, click thanh toán => trạng thái vé 1->2
            //trong vòng 5p nếu không thanh toán -> chuyển trạng thái 1->2 thì vé sẽ quay về trạng thái 0
            foreach(var idmovie in listIdTicket)
            {
                var ticket = _context.MstTicket
                    .Where(e => e.IsDeleted == false && e.Id == idmovie).FirstOrDefault();
                if(action == 0)
                    ticket.Status = 1;
                if (action == 1)
                    ticket.Status = 0;
                if (action == 2)
                {
                    if (!await checkStatusTicketIsBought(listIdTicket))
                        ticket.Status = 2;
                    else
                        throw new UserFriendlyException("Tickets are bought by another person!");
                }    
                if (ticket.Status == 2)
                    ticket.CustomerId = IdCus;
                _context.MstTicket.Update(ticket);
                await _context.SaveChangesAsync();
            }
        }

        //hàm kiểm tra xem lúc chuẩn bị bấm nút thanh toán thì vé đã đc mua chưa (check lại)
        // nếu chưa mới mua và đổi trạng thái được
        private async Task<bool> checkStatusTicketIsBought(List<long> listIdTicket)
        {
            bool check = true;
            foreach (var idmovie in listIdTicket)
            {
                var ticket = await _context.MstTicket
                    .Where(e => e.IsDeleted == false && e.Id == idmovie).FirstOrDefaultAsync();
                if (ticket.Status == 2)
                {
                    check = false;
                    break;
                }
            }
            return check;
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
            var shows = await (from showtime in _context.MstShowTimes.Where(e => e.IsDeleted == false && e.MovieId == idmovie
                        && e.StartTime.Date == startTime.Date)

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
    }
}
