using System;

namespace CinemaManagement.DTOs.CmsDtos.ShowTime
{
    public class InfoShowtimeDto
    {
        public long Id { get; set; }
        public string StartTime { get; set; }
        public long IdMovie { get; set; }
        public long IdRoom { get; set; }
    }
}
