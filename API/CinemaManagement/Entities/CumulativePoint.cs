using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;

namespace CinemaManagement.Entities
{
    public class CumulativePoint : FullAuditedEntity<long>, IEntity<long>
    {
        public long? RankId { get; set; }
        public long? Money { get; set; }
        public decimal? Point { get; set; }
    }
}