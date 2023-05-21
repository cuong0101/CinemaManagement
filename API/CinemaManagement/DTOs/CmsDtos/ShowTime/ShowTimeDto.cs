using System.ComponentModel.DataAnnotations;
using System;
using Abp.Domain.Entities;

namespace CinemaManagement.DTOs.CmsDtos.ShowTime
{
    public class ShowTimeDto : Entity<long?>
    {
        public DateTime StartDate { get; set; }
        //public string Time { get; set; }
        public long IdMovie { get; set; }
        public long IdRoom { get; set; }
        public string MovieName { get; set; }
        public string RoomName { get; set; }
    }
}
