using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;

namespace CinemaManagement.DTOs.CmsDtos.MstPromotionDto
{
    public class MstPromotionForView : EntityDto<long>
    {
        public string PromotionContent { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string Description { get; set; }
        public List<MstPromotionDetailDto> PromotionDetails { get; set; }
    }
}
