using System.ComponentModel.DataAnnotations;
using System;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;

namespace CinemaManagement.Entities
{
    public class MstShowTime : FullAuditedEntity<long>, IEntity<long>
    {
        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public int MovieId { get; set; }

        [Required]
        public int RoomId { get; set; }

    }
}
