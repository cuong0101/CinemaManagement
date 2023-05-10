using System;

namespace CinemaManagement.DTOs.CmsDtos
{
    public class SeatDto
    {
        public long ?Id { get; set; }
        public string ?Row { get; set; }
        public string ? Column { get; set; }
        public long? IdRoom { get; set; }
        public long? IdSeatRank { get; set; }



    }
}
