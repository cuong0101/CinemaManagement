using CinemaManagement.Entities;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace CinemaManagement.Data
{
    public class DataContext : DbContext
    {
        public DataContext([NotNull] DbContextOptions options) : base(options)
        {
        }
        public DbSet<AppUser> Users { get; set; }
        public DbSet<MstCustomer> MstCustomer { get; set; }
        public DbSet<MstSeatRank> MstSeatRank { get; set; }
        public DbSet<MstMovieType> MstMovieTypes { get; set; }
        public DbSet<MstMovie> MstMovie { get; set; }
        public DbSet<MstBenefitsCus> MstBenefitsCus { get; set; }
        public DbSet<MstPromotion> MstPromotions { get; set; }
        public DbSet<MstPromotionDetail> MstPromotionDetail { get; set; }
        public DbSet<MstRankPoint> MstRankPoints { get; set; }
        public DbSet<MstRoom> MstRooms { get; set; }
        public DbSet<MstShowTime> MstShowTimes { get; set; }
        public DbSet<MstSeat> MstSeats { get; set; }
        public DbSet<MstTicket> MstTicket { get; set; }
        public DbSet<TicketPrice> TicketPrice { get; set; }
        public DbSet<HistoryChangeGift> HistoryChangeGift { get; set; }
        public DbSet<PolicyGifts> PolicyGift { get; set; }
        public DbSet<CumulativePoint> CumulativePoints { get; set; }
        public DbSet<MstFood> MstFood { get; set; }

    }
}
