using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;

namespace CinemaManagement.Entities
{
    public class MstRankPoint : FullAuditedEntity<long>, IEntity<long>
    {
        public string Grade { get; set; }
        public bool IsActive { get; set; } //Trạng thái hoạt động
        public DateTime? OperationDate { get; set; } //Ngày hoạt động
        public DateTime? ExpirationDate { get; set; } //Ngày hết hạn
        public int Point { get; set; } //Điểm cần đạt
        public string Description { get; set; }

    }
}
