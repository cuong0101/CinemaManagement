using Abp.Application.Services.Dto;
using Abp.UI;
using AutoMapper;
using CinemaManagement.Controllers.CMSController;
using CinemaManagement.Data;
using CinemaManagement.DTOs.CmsDtos;
using CinemaManagement.Entities;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaManagement.Controllers.CmsController
{
    public class MovieController : BaseApiController
    {
        private Cloudinary cloudinary;
        public const string CLOUD_NAME = "vitcamo";
        public const string API_KEY = "994713494841983";
        public const string API_SECRET = "j4IFJKw-dNFx382XJgZF0JYS3IY";
        private readonly DataContext _context;
        private readonly DapperContext _dapper;
        public MovieController(DataContext context, DapperContext dapper, IMapper mapper):base(mapper)
        {
            _context = context;
            _dapper = dapper;
        }

        [HttpGet("GetAll")]
        public async Task<List<MovieDto>> GetAll()
        {
            var movies = _context.MstMovie.ToList().Where(e=>e.IsDeleted == false);
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
        protected virtual async Task Create([FromForm]CreateOrEditMovieDto input)
        {
            var name = _context.MstMovie.ToList().Where(e => e.Name == input.Name).Count();
            if (name > 0)
            {
                throw new Exception("This name already exists");
            }
            string imageUrl = "https://res.cloudinary.com/vitcamo/image/upload/v1681699791/no_avatar_flmg5r.png";

            if (input.Image != null)
            {
                Account account = new Account(CLOUD_NAME, API_KEY, API_SECRET);
                cloudinary = new Cloudinary(account);
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(input.Image.FileName, input.Image.OpenReadStream()),
                    PublicId = Guid.NewGuid().ToString(),
                    Transformation = new Transformation().Crop("limit").Width(1000).Height(1000)
                };
                var uploadResult = await cloudinary.UploadAsync(uploadParams);
                imageUrl = uploadResult.Url.ToString();
            }
            var movie = new MstMovie
            {
                Name = input.Name,
                Image = imageUrl,
                Trailer = input.Trailer,
                Director = input.Director,
                Actor = input.Actor,
                PublishDate = input.PublishDate,
                Time = TimeSpan.Parse(input.Time),
                Rated = input.Rated,
                Description = input.Description,
                Languages = input.Languages
            };
            _context.Add(movie);
            await _context.SaveChangesAsync();
        }
        protected virtual async Task Update([FromForm] CreateOrEditMovieDto input)
        {
            var movie = _context.MstMovie.Find(input.Id);

            string imageUrl = movie.Image;

            if (input.Image != null)
            {
                Account account = new Account(CLOUD_NAME, API_KEY, API_SECRET);
                cloudinary = new Cloudinary(account);
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(input.Image.FileName, input.Image.OpenReadStream()),
                    PublicId = Guid.NewGuid().ToString(),
                    Transformation = new Transformation().Crop("limit").Width(1000).Height(1000)
                };
                var uploadResult = await cloudinary.UploadAsync(uploadParams);
                imageUrl = uploadResult.Url.ToString();
            }
                movie.Name = string.IsNullOrWhiteSpace(input.Name) || string.IsNullOrEmpty(input.Name) ? movie.Name : input.Name;
                movie.Image = imageUrl;
                movie.Trailer = string.IsNullOrWhiteSpace(input.Trailer) || string.IsNullOrEmpty(input.Trailer) ? movie.Trailer : input.Trailer;
                movie.Director = string.IsNullOrWhiteSpace(input.Director) || string.IsNullOrEmpty(input.Director) ? movie.Director : input.Director;
                movie.Actor = string.IsNullOrWhiteSpace(input.Actor) || string.IsNullOrEmpty(input.Actor) ? movie.Actor : input.Actor;
                movie.PublishDate = input.PublishDate;
                movie.Time = TimeSpan.Parse(input.Time);
                movie.Rated = string.IsNullOrWhiteSpace(input.Rated) || string.IsNullOrEmpty(input.Rated) ? movie.Rated : input.Rated;
                movie.Description = string.IsNullOrWhiteSpace(input.Description) || string.IsNullOrEmpty(input.Description) ? movie.Description : input.Description;
                movie.Languages = string.IsNullOrWhiteSpace(input.Languages) || string.IsNullOrEmpty(input.Languages) ? movie.Languages : input.Languages;
            _context.MstMovie.Update(movie);
            await _context.SaveChangesAsync();
        }

        [HttpPost("CreateOrEdit")]
        [Consumes("multipart/form-data")]
        [RequestFormLimits(MultipartBodyLengthLimit = 209715200 / 2)]
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
        public async Task Delete(EntityDto<long> input)
        {
            var movie = _context.MstMovie.Find(input.Id);
            movie.IsDeleted = true;
            _context.MstMovie.Update(movie);
            await _context.SaveChangesAsync();
        }
    }
}
