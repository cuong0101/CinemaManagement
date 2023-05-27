using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaManagement.DTOs.CmsDtos
{
    public class MovieDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Trailer { get; set; }
        public string Director { get; set; }
        public string Actor { get; set; }
        public DateTime? PublishDate { get; set; }
        public int? Time { get; set; }
        public string Languages { get; set; }
        public string Rated { get; set; }
        public string Description { get; set; }
    }
}
