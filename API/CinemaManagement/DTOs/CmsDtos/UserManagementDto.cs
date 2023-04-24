using System.ComponentModel.DataAnnotations;
using System;

namespace CinemaManagement.DTOs.CmsDtos
{
    public class UserManagementDto
    {
        public long? Id { get; set; }
        public string UserName { get; set; }
        public string Image { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public DateTime? DoB { get; set; }
        public bool Sex { get; set; }
        public string Email { get; set; }
    }
}
