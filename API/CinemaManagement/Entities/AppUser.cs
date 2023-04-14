﻿using CinemaManagement.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace CinemaManagement.Entities
{
    public class AppUser : IAppUser
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}
