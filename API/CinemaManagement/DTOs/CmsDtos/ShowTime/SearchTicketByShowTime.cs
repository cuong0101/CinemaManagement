using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Security.Policy;

namespace CinemaManagement.DTOs.CmsDtos.ShowTime
{
    public class SearchTicketByShowTime : Entity<long>
    {
        public DateTime StartDate { get; set; }
        public DateTime StartTime { get; set; }
        public string  Time { get; set; }
        public string  MovieName{ get; set; }
        public string RoomName { get; set; }
        public List<TicketByShowTime> listTicket { get; set; }

    }
}
