using AutoMapper;
using CinemaManagement.DTOs.CmsDtos;
using CinemaManagement.Entities;

namespace CinemaManagement.Helpers
{
    public class AutoMapperPro: Profile
    {
        public AutoMapperPro() 
        {
            CreateMap<UserManagementDto, AppUser>().ReverseMap();
            CreateMap<SeatRankDto, MstSeatRank>().ReverseMap();
            //map nhưng gì thì khai báo vào đâu
        }
    }
}
