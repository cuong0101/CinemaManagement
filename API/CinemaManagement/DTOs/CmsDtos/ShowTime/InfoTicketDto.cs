namespace CinemaManagement.DTOs.CmsDtos.ShowTime
{
    public class InfoTicketDto
    {
        public long id { get; set; }
        public string location { get; set; }
        public string seatrank { get; set; }
        public decimal? price { get; set; }
        public long? idShowtime { get; set; }
        public int? status { get; set; }

    }
}
