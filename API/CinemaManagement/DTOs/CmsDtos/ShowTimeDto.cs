using System.ComponentModel.DataAnnotations;
using System;

namespace CinemaManagement.DTOs.CmsDtos
{
    public class ShowTimeDto
    {
        public long? Id { get; set; }

        public DateTime Release { get; set; } //Ngày chiếu
        public TimeSpan? StartTime { get; set; } // Giờ bắt đầu
        public TimeSpan? EndRime { get; set; } //Giờ kết thúc
        public int IdMoive { get; set; } //Id phim
        public int IdRoom { get; set; } //Id Phòng chiếu
    }
}
