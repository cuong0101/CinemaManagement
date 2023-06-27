using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace CinemaManagement.Entities
{
    public class HistoryChangeGift : FullAuditedEntity<long>, IEntity<long>
    {
        public long CusId { get; set; }
        public long GiftId { get; set; }
        public bool UsedStatus { get; set; }
    }
}
