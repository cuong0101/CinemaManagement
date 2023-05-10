using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace CinemaManagement.Entities
{
    public class MstRoom : FullAuditedEntity<long>, IEntity<long>
    {
        [Required]
        public string Name { get; set; } //Tên phòng
        public string Description { get; set; }
    }
}