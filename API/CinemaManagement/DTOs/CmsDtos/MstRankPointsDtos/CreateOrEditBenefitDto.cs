using Abp.Domain.Entities;

namespace CinemaManagement.DTOs.CmsDtos.MstRankPointsDtos
{
    public class CreateOrEditBenefitDto : Entity<long?>
    {
        public int RankPointId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
