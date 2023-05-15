using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations;

namespace CinemaManagement.Entities
{
    public class TicketPrice : FullAuditedEntity<long>, IEntity<long>
    {
        [Required]
        public long Price { get; set; }
    }
}
