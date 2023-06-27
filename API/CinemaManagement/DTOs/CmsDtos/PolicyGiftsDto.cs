using System;

namespace CinemaManagement.DTOs.CmsDtos
{
    public class PolicyGiftsDto
    {
        public long? Id { get; set; }
        public string GiftName { get; set; }
        public int Point { get; set; } // Điểm quy đổi
        public bool IsStatus { get; set; } // trạng thái hoạt động
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string Description { get; set; }
    }
}
