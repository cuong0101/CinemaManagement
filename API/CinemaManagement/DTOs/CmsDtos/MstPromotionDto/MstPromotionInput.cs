using System;

namespace CinemaManagement.DTOs.CmsDtos.MstPromotionDto
{
    public class MstPromotionInput
    {
        public string PromotionContent { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }
}
