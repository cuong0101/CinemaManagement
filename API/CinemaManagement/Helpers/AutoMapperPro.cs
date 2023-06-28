using AutoMapper;
using CinemaManagement.DTOs.CmsDtos;
using CinemaManagement.DTOs.CmsDtos.MstPromotionDto;
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
            CreateMap<RoomDto, MstRoom>().ReverseMap();
            CreateMap<SeatDto, MstSeat>().ReverseMap();
            CreateMap<AddShowTime, MstShowTime>().ReverseMap();
            CreateMap<ShowTimeDto, MstShowTime>().ReverseMap();
            CreateMap<CreateOrEditRankPointsDto, MstRankPoint>().ReverseMap();
            CreateMap<CreateOrEditPromotionDto, MstPromotion>().ReverseMap();
            CreateMap<CreateOrEditPromotionDetailDto, MstPromotionDetail>().ReverseMap();
            CreateMap<TicketByShowTime, MstTicket>().ReverseMap();
            CreateMap<PolicyGiftsDto, PolicyGifts>().ReverseMap();
            CreateMap<CreateOrEditBenefitDto, MstBenefitsCus>().ReverseMap();
            CreateMap<CreateOrEditCumulativeDto, CumulativePoint>().ReverseMap();
            //map nhưng gì thì khai báo vào đâu
        }
    }
}
