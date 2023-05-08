using Abp.Domain.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaManagement.DTOs.CmsDtos
{
    public class CreateOrEditMovieDto : Entity<long?>
    {
        public string Name { get; set; }
        public IFormFile Image { get; set; }
        public string Trailer { get; set; }
        public string Director { get; set; }
        public string Actor { get; set; }
        public DateTime PublishDate { get; set; }
        public string Time { get; set; }
        public string Languages { get; set; }
        public string Rated { get; set; }
        public string Description { get; set; }
    }
}
