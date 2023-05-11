using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace CinemaManagement.Entities.seat
{
    public class GetAllSeatDto : FullAuditedEntity<long>, IEntity<long>
    {
        [Required]
        public int? Id { get; set; }
        [Required]
        public string Row { get; set; }
        [Required]
        public string Column { get; set; }
        [Required]
        public string? NameRoom { get; set; } 

        [Required]
        public string? NameSeatRank { get; set; } 
    }
}