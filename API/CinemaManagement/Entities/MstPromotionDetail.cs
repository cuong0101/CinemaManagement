using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace CinemaManagement.Entities
{
    public class MstPromotionDetail : FullAuditedEntity<long>, IEntity<long>
    {
        public string PromotionId { get; set; }
        public long? CusId { get; set; }
        public string Description { get; set; }
    }
}
