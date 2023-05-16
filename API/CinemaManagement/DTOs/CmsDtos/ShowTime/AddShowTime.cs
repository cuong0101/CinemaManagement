using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;

namespace CinemaManagement.DTOs.CmsDtos.ShowTime
{
    public class AddShowTime : Entity<long?>
    {
        public DateTime StartTime { get; set; }
        public long MovieId { get; set; }
        public long RoomId { get; set; }
    }
}
