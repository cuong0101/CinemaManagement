using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;

namespace CinemaManagement.Entities
{
    public class PolicyGifts : FullAuditedEntity<long>, IEntity<long>
    {
        public long? Id { get; set; }
        [Required]
        public string GiftName { get; set; }
        public string Image { get; set; }
        [Required]
        public int Point { get; set; } // Điểm quy đổi
        public bool IsStatus { get; set; } // trạng thái hoạt động
        [Required]
        public DateTime? FromDate { get; set; }
        [Required]
        public DateTime? ToDate { get; set; }
        public string Description { get; set; }
    }
}
