using System;
using System.Collections.Generic;

namespace CinemaManagement.DTOs.CmsDtos.MstRankPointsDtos
{
    public class MstRankPointsForView
    {
        public long? Id { get; set; }
        public string Grade { get; set; }
        public bool IsActive { get; set; } //Trạng thái hoạt động
        public DateTime? OperationDate { get; set; } //Ngày hoạt động
        public DateTime? ExpirationDate { get; set; } //Ngày hết hạn
        public int NumberOfVisit { get; set; } //Số lần xem phim
        public string Description { get; set; }
    }
}
