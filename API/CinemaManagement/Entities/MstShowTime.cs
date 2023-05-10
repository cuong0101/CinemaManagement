using System.ComponentModel.DataAnnotations;
using System;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;

namespace CinemaManagement.Entities
{
    public class MstShowTime : FullAuditedEntity<long>, IEntity<long>
    {
        [Required]
        public DateTime? Release { get; set; } //Ngày chiếu
        [Required]
        public TimeSpan? StartTime { get; set; } // Giờ bắt đầu
        [Required]
        public TimeSpan? EndRime { get; set; } //Giờ kết thúc

        [Required]
        public int? IdMoive { get; set; } //Id phim

        [Required]
        public int? IdRoom { get; set; } //Id Phòng chiếu

    }
}
