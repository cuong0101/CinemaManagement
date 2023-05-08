using AutoMapper;
using CinemaManagement.Controllers.CMSController;
using CinemaManagement.Data;
using CinemaManagement.DTOs.CmsDtos;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaManagement.Controllers.WeuController
{
    public class MovieInfoController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly DapperContext _dapper;

        public MovieInfoController(DataContext context, DapperContext dapper, IMapper mapper) : base(mapper)
        {
            _context = context;
            _dapper = dapper;
        }
        [HttpGet("getListMovie")]
        public async Task<List<MovieDto>> getListMovie()
        {
            var movies = _context.MstMovie.ToList().Where(e => e.IsDeleted == false);
            var res = (from movie in movies
                       select new MovieDto
                       {
                           Id = movie.Id,
                           Name = movie.Name,
                           Image = movie.Image,
                           Trailer = movie.Trailer,
                           Director = movie.Director,
                           Actor = movie.Actor,
                           PublishDate = movie.PublishDate.Value.Date,
                           Time = (movie.Time.Value.Hours < 10 ? "0" + movie.Time.Value.Hours :
                            movie.Time.Value.Hours + "") + ":" + (movie.Time.Value.Minutes < 10 ?
                            "0" + movie.Time.Value.Minutes : movie.Time.Value.Minutes + ""),
                           Languages = movie.Languages,
                           Rated = movie.Rated,
                           Description = movie.Description
                       }).ToList();
            return res;
        }
    }
}
