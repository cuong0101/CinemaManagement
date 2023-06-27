using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace CinemaManagement.Entities
{
    public class MstFood : FullAuditedEntity<long>, IEntity<long>
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }
}
