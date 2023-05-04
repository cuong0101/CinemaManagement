﻿using CinemaManagement.Entities;
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

    }
}
