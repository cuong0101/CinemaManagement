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
        public int NumberOfVisit { get; set; } //Số lần ghé rạp trong 12 tháng (kể từ ngày mở tk)
        public string Description { get; set; }

    }
}
