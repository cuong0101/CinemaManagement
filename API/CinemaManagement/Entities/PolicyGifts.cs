using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;

namespace CinemaManagement.Entities
{
    public class PolicyGifts : FullAuditedEntity<long>, IEntity<long>
    {
<<<<<<< HEAD
        public long? Id { get; set; }
=======
>>>>>>> 393aadd1f38e946af84b18f46ad381c1b05e9f55
        public string GiftName { get; set; }
        public int Point { get; set; } // Điểm quy đổi
        public bool IsStatus { get; set; } // trạng thái hoạt động
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string Description { get; set; }   
    }
}
