﻿using Abp.UI;
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

        [HttpPost("AdminCheckTicket")]
        //Kiểm tra vé đã được chọn bởi người khác chưa?
        // nếu chưa đổi trạng thái vé sang 2
        //Hoàn cảnh: khi đang bấm chọn ghế -> bấm đặt vé -> thay đổi trạng thái các vé đc chọm
        // để người khác k chọn được
        public async Task<bool> AdminCheckTicket(ListTicketInputDto input)
        {
            foreach(var idmovie in input.listticket)
            {
                var ticket = _context.MstTicket
                    .Where(e => e.IsDeleted == false && e.Id == idmovie).FirstOrDefault();

                if(ticket.Status != 0)
                {
                    return false;
                }

                ticket.Status = 2;
                ticket.EmployeeId = input.PersonId;
                ticket.LastModificationTime = DateTime.Now;
            }
            return true;
        }

        [HttpPost("AdminBooking")]
        public async Task AdminBooking(ListTicketInputDto input)
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
                }
            }
            catch(Exception ex)
            {
                foreach (var idmovie in input.listticket)
                {
                    var ticket = _context.MstTicket
                       .Where(e => e.IsDeleted == false && e.Id == idmovie).FirstOrDefault();

                    ticket.Status = 0; // 1 là đã được mua
                    ticket.EmployeeId = null;
                    ticket.LastModificationTime = DateTime.Now;
                }

                throw new UserFriendlyException("Có lỗi trong quá trình đặt vé");
            }
           
        }

        [HttpPost("CustomerCheckTicket")]
        public async Task<bool> CustomerCheckTicket(ListTicketInputDto input)
        {
            foreach (var idmovie in input.listticket)
            {
                var ticket = _context.MstTicket
                    .Where(e => e.IsDeleted == false && e.Id == idmovie).FirstOrDefault();

                if (ticket.Status != 0)
                {
                    return false;
                }

                ticket.Status = 2;
                ticket.CustomerId = input.PersonId;
                ticket.LastModificationTime = DateTime.Now;
            }
            return true;
        }

        [HttpPost("CustomerBooking")]
        public async Task CustomerBooking(ListTicketInputDto input)
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
                }
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
                }

                throw new UserFriendlyException("Có lỗi trong quá trình đặt vé");
            }

        }
        [HttpPost("CancelBooking")]
        public async Task CancelBooking(ListTicketInputDto input)
        {
            foreach (var idmovie in input.listticket)
            {
                var ticket = _context.MstTicket
                   .Where(e => e.IsDeleted == false && e.Id == idmovie).FirstOrDefault();

                ticket.Status = 0; // 1 là đã được mua
                ticket.CustomerId = null;
                ticket.EmployeeId = null;
                ticket.LastModificationTime = DateTime.Now;
            }
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
