using AutoMapper;
using CinemaManagement.DTOs.CmsDtos;
using CinemaManagement.DTOs.CmsDtos.MstRankPointsDtos;
using CinemaManagement.DTOs.CmsDtos.ShowTime;
using CinemaManagement.Entities;

namespace CinemaManagement.Helpers
{
    public class AutoMapperPro: Profile
    {
        public AutoMapperPro() 
        {
            CreateMap<UserManagementDto, AppUser>().ReverseMap();
            CreateMap<SeatRankDto, MstSeatRank>().ReverseMap();
<<<<<<< Updated upstream
=======
            CreateMap<RoomDto, MstRoom>().ReverseMap();
            CreateMap<SeatDto, MstSeat>().ReverseMap();
            //CreateMap<ShowTimeDto, MstShowTime>().ReverseMap();
            CreateMap<AddShowTime, MstShowTime>().ReverseMap();
>>>>>>> Stashed changes
            CreateMap<CreateOrEditRankPointsDto, MstRankPoint>().ReverseMap();
            //map nhưng gì thì khai báo vào đâu
        }
    }
}
