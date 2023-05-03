using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace CinemaManagement.Entities
{
    public class MstMovieType : FullAuditedEntity<long>, IEntity<long>
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
