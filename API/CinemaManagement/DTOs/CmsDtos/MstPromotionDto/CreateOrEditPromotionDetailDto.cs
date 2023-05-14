using Abp.Domain.Entities;

namespace CinemaManagement.DTOs.CmsDtos.MstPromotionDto
{
    public class CreateOrEditPromotionDetailDto : Entity<long?>
    {
        public long? PromotionId { get; set; }
        public long? CusId { get; set; }
        public string Description { get; set; }
    }
}
