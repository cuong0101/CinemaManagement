using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;

namespace CinemaManagement.DTOs.CmsDtos.ShowTime
{
    public class AddShowTime
    {
        public long? Id { get; set; }
        public DateTime StartTime { get; set; }
        public int MovieId { get; set; }
        public int RoomId { get; set; }
    }
}
