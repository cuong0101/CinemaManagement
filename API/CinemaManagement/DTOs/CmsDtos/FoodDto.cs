using Abp.Domain.Entities;

namespace CinemaManagement.DTOs.CmsDtos
{
    public class FoodDto : Entity<long?>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }
}
