using System.ComponentModel.DataAnnotations;

namespace CinemaManagement.Entities
{
    public class AppUser
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string  PasswordSaft { get; set; }
    }
}
