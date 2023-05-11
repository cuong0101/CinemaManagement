﻿using AutoMapper;
using CinemaManagement.DTOs.CmsDtos;
using CinemaManagement.DTOs.CmsDtos.MstRankPointsDtos;
using CinemaManagement.Entities;
using CinemaManagement.Entities.seat;

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
            CreateMap<ShowTimeDto, MstShowTime>().ReverseMap();
            CreateMap<CreateOrEditRankPointsDto, MstRankPoint>().ReverseMap();
            //map nhưng gì thì khai báo vào đâu
        }
    }
}
