using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaManagement.Entities
{
    public class MstMovie : FullAuditedEntity<long>, IEntity<long>
    {
        [Required]
        public string Name { get; set; }
        public string Image { get; set; }
        public string Trailer { get; set; }
        public string Director { get; set; }
        public string Actor { get; set; }
        [Required]
        public DateTime? PublishDate { get; set; }
        public int? Time { get; set; }
        public string Languages { get; set; }
        public string Rated { get; set; }
        public string Description { get; set; }
    }
}
