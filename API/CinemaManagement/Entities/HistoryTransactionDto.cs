using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace CinemaManagement.Entities
{
    public class HistoryTransactionDto : FullAuditedEntity<long>, IEntity<long>
    {
        public decimal? Price { get; set; }
    }
}
