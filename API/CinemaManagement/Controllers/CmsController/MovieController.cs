using CinemaManagement.Controllers.CMSController;
using CinemaManagement.Data;
using CinemaManagement.DTOs.CmsDtos;
using CinemaManagement.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaManagement.Controllers.CmsController
{
    public class MovieController : BaseApiController
    {
        private readonly DataContext _context;

        public MovieController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("GetAll")]
        public async Task<List<MovieDto>> GetAll()
        {
            var movies = _context.MstMovie.ToList();
            var res = (from movie in movies
                       select new MovieDto
                       { 
                        Name = movie.Name,
                        Image = movie.Image,
                        Trailer = movie.Trailer,
                        Director = movie.Director,
                        Actor = movie.Actor,
                        PublishDate = movie.PublishDate,
                        Time = movie.Time,
                        Languages = movie.Languages,
                        Rated = movie.Rated,
                        Description = movie.Description
                       }).ToList();
            return res;
        }
    }
}
