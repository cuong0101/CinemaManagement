using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace CinemaManagement.Entities
{
    public class MstBenefitsCus : FullAuditedEntity<long>, IEntity<long>
    {
        public int RankPointId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
