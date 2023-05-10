using System.ComponentModel.DataAnnotations;
using System;
namespace CinemaManagement.DTOs.CmsDtos
{
    public class RoomDto
    {
        public long? Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
    }
}
