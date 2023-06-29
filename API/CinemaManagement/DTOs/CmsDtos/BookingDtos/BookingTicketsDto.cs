using System.Collections.Generic;

namespace CinemaManagement.DTOs.CmsDtos.BookingDtos
{
    public class BookingTicketsDto
    {
        public long? cusId { get; set; }
        public long? empId { get; set; }
        public List<long> listticket { get; set; }
        public decimal totalAmount { get; set; }
        public List<FoodItemDto> listfood { get; set; }

    }
}
