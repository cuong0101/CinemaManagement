using CinemaManagement.Entities;

namespace CinemaManagement.Interfaces
{
    public interface ITokenService
    {
        public string CreateToken(AppUser users);
    }
}
