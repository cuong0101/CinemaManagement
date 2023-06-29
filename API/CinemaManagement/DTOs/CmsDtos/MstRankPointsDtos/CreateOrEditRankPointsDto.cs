using System;

namespace CinemaManagement.DTOs.CmsDtos.MstRankPointsDtos
{
    public class CreateOrEditRankPointsDto
    {
        public long? Id { get; set; }
        public string Grade { get; set; }
        public bool IsActive { get; set; } //Trạng thái hoạt động
        public DateTime? OperationDate { get; set; } //Ngày hoạt động
        public DateTime? ExpirationDate { get; set; } //Ngày hết hạn
        public int NumberOfVisit { get; set; } //Điểm cần đạt
        public long Money { get; set; }
        public decimal Point { get; set; }
        public string Description { get; set; }
    }
}
