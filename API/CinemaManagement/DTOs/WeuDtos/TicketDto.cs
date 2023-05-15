namespace CinemaManagement.DTOs.WeuDtos
{
    public class TicketDto
    {
        public long Id { get; set; }
        public string Location { get; set; }
        public int Status { get; set; }
        public decimal Price { get; set; }
        public string SeatRankName { get; set; }
        public long? CustomerId { get; set; }
        public long? EmpoyeeId { get; set; }
    }
}
