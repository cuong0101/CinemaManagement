namespace CinemaManagement.DTOs.WeuDtos
{
    public class CustomerResultLogin
    {
        public CustomerResultLogin(string username, string accessToken, string refreshToken)
        {
            this.username = username;
            this.accessToken=accessToken;
            this.refreshToken=refreshToken;
        }

        public string username { get; set; }
        public string accessToken { get; set; }
        public string refreshToken { get; set; }
    }
}
