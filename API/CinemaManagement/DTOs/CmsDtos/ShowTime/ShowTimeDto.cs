using System.ComponentModel.DataAnnotations;
using System;

namespace CinemaManagement.DTOs.CmsDtos.ShowTime
{
    public class ShowTimeDto
    {
        public long Id { get; set; }
        public DateTime StartDate { get; set; }
        public string StartTime { get; set; }
        public string Time { get; set; }
        public string MovieName { get; set; }
        public string RoomName { get; set; }

    }
}
