namespace CinemaManagement.DTOs
{
    public class UserDto
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
