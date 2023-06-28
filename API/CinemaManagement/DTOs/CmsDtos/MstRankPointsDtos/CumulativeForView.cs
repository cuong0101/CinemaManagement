using System;

namespace CinemaManagement.DTOs.CmsDtos.MstRankPointsDtos
{
    public class CumulativeForView
    {
        public long? Id { get; set; }
        public long? RankId { get; set; }
        public string RankName { get; set; }
        public long? Money { get; set; }
        public decimal? Point { get; set; }
    }
}
