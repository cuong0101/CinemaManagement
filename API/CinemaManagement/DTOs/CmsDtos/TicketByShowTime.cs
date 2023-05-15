using Abp.Domain.Entities;

namespace CinemaManagement.DTOs.CmsDtos
{
    public class TicketByShowTime : Entity<long>
    {
        public string Row { get; set; }
        public string Column { get; set; }
        public string Location { get; set; }
        public string SeatRankName { get; set; }
        public int Status { get; set; }
        public decimal Price { get; set; }
    }
}
