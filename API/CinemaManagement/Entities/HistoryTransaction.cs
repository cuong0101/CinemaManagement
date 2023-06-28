using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;

namespace CinemaManagement.Entities
{
    public class HistoryTransaction : FullAuditedEntity<long>, IEntity<long>
    {
        public decimal Price { get; set; }
        public long PersonId { get; set; }
    }
}
