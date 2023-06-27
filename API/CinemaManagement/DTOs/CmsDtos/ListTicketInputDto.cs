using System.Collections.Generic;

namespace CinemaManagement.DTOs.CmsDtos
{
    public class ListTicketInputDto
    {
        public List<long> listticket { get; set; }
        public long? PersonId { get; set; }
    }
}
