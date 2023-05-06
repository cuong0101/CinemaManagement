using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;

namespace CinemaManagement.Entities
{
    public class MstPromotion : FullAuditedEntity<long>, IEntity<long>
    {
        public string PromotionContent { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string Description { get; set; }

    }
}
