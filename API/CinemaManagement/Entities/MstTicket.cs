using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations;

namespace CinemaManagement.Entities
{
    public class MstTicket : FullAuditedEntity<long>, IEntity<long>
    {
        [Required]
        public long ShowTimeId { get; set; }
        [Required]
        public long SeatId { get; set; }
        [Required]
        public decimal Price { get; set; }
        public long? CustomerId { get; set; }
        public long? EmployeeId { get; set; }
        public int Status { get; set; }

    }
}
