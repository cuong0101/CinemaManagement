using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace CinemaManagement.Entities.seat
{
    public class MstSeat : FullAuditedEntity<long>, IEntity<long>
    {
        [Required]
        public string Row { get; set; }
        [Required]
        public string Column { get; set; }
        [Required]
        public int IdRoom { get; set; } 

        [Required]
        public long IdSeatRank { get; set; }
    }
}
