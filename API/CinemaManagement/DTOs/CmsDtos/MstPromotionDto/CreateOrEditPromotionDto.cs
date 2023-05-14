using Abp.Domain.Entities;
using System;

namespace CinemaManagement.DTOs.CmsDtos.MstPromotionDto
{
    public class CreateOrEditPromotionDto : Entity<long?>
    {
        public string PromotionContent { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string Description { get; set; }
    }
}
