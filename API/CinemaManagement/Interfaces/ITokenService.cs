using CinemaManagement.DTOs;
using CinemaManagement.Entities;

namespace CinemaManagement.Interfaces
{
    public interface ITokenService
    {
        public string CreateToken(AppUser users);
        public string CreateToken(MstCustomer cus);
    }
}
