using AutoMapper;
using CinemaManagement.Data;
using CinemaManagement.DTOs.CmsDtos;
using CinemaManagement.Entities;
using CinemaManagement.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaManagement.Controllers.CmsController
{
    public class MovieController : BaseApiController_new
    {
        private readonly DataContext _context;
        private readonly DapperContext _dapper;
        private readonly IPhotoService _photoService;
        public MovieController(DataContext context, DapperContext dapper, IMapper mapper, IPhotoService photoService) : base(mapper)
        {
            _context = context;
            _dapper = dapper;
            _photoService=photoService;
        }

        [HttpGet("GetAll")]
        public async Task<List<MovieDto>> GetAll()
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
                           Time = movie.Time,
                           Languages = movie.Languages,
                           Rated = movie.Rated,
                           Description = movie.Description
                       }).ToList();
            return res;
        }

        //[Consumes("multipart/form-data")]
        //[RequestFormLimits(MultipartBodyLengthLimit = 209715200 / 2)]

        private async Task Create(CreateOrEditMovieDto input)
        {
            var name = _context.MstMovie.ToList().Where(e => e.Name == input.Name).Count();
            if (name > 0)
            {
                throw new Exception("This name already exists");
            }
            string imageUrl = "https://res.cloudinary.com/vitcamo/image/upload/v1681699791/no_avatar_flmg5r.png";

            //if (input.Image != null)
            //{
            //    imageUrl = _photoService.AddPhotoAsync(input.Image).Result.Url.ToString();
            //}
            var movie = new MstMovie
            {
                Name = input.Name,
                Image = imageUrl,
                Trailer = input.Trailer,
                Director = input.Director,
                Actor = input.Actor,
                PublishDate = input.PublishDate,
                Time = input.Time ?? 0,
                Rated = input.Rated,
                Description = input.Description,
                Languages = input.Languages
            };
            _context.Add(movie);
            await _context.SaveChangesAsync();
        }
        private async Task Update(CreateOrEditMovieDto input)
        {
            var movie = _context.MstMovie.Find(input.Id);

            string imageUrl = movie.Image;

            movie.Name = string.IsNullOrWhiteSpace(input.Name) || string.IsNullOrEmpty(input.Name) ? movie.Name : input.Name;
            movie.Image = imageUrl;
            movie.Trailer = string.IsNullOrWhiteSpace(input.Trailer) || string.IsNullOrEmpty(input.Trailer) ? movie.Trailer : input.Trailer;
            movie.Director = string.IsNullOrWhiteSpace(input.Director) || string.IsNullOrEmpty(input.Director) ? movie.Director : input.Director;
            movie.Actor = string.IsNullOrWhiteSpace(input.Actor) || string.IsNullOrEmpty(input.Actor) ? movie.Actor : input.Actor;
            movie.PublishDate = string.IsNullOrEmpty(input.PublishDate.ToString()) || string.IsNullOrWhiteSpace(input.PublishDate.ToString()) ? movie.PublishDate : input.PublishDate;
            movie.Time = input.Time ?? movie.Time;
            movie.Rated = string.IsNullOrWhiteSpace(input.Rated) || string.IsNullOrEmpty(input.Rated) ? movie.Rated : input.Rated;
            movie.Description = string.IsNullOrWhiteSpace(input.Description) || string.IsNullOrEmpty(input.Description) ? movie.Description : input.Description;
            movie.Languages = string.IsNullOrWhiteSpace(input.Languages) || string.IsNullOrEmpty(input.Languages) ? movie.Languages : input.Languages;
            _context.MstMovie.Update(movie);
            await _context.SaveChangesAsync();
        }

        [HttpPost("CreateOrEdit")]
        public async Task CreateOrEdit(CreateOrEditMovieDto input)
        {
            if (input.Id == null)
            {
                await Create(input);
            }
            else
            {
                await Update(input);
            }
        }
        [HttpPost("Delete")]
        public async Task Delete([Required] long id)
        {
            var movie = _context.MstMovie.Find(id);
            movie.IsDeleted = true;
            _context.MstMovie.Update(movie);
            await _context.SaveChangesAsync();
        }

        [HttpPost("add-photo")]
        //[System.Obsolete]
        public async Task<string> TestUpLoadFile(IFormFile file)
        {
            return _photoService.AddPhotoAsync(file).Result.Url.ToString();
        }
    }
}
