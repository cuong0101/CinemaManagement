using Abp.Application.Services.Dto;

namespace CinemaManagement.DTOs.CmsDtos.MstPromotionDto
{
    public class MstPromotionDetailDto : EntityDto<long>
    {
        public long? CusId { get; set; }
        public string CusName { get; set; }
        public long? PromotionId { get; set; }
        public string Description { get; set; }
    }
}
