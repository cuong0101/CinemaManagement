using Abp.UI;
using AutoMapper;
using CinemaManagement.Data;
using CinemaManagement.DTOs.CmsDtos;
using CinemaManagement.Entities;
using CinemaManagement.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaManagement.Controllers.CmsController
{
    public class MstFoodController : BaseApiController_new
    {
        private readonly DataContext _context;
        private readonly DapperContext _dapper;
        private readonly IPhotoService _photoService;
        public MstFoodController(DataContext context, DapperContext dapper, IMapper mapper, IPhotoService photoService) : base(mapper)
        {
            _context = context;
            _dapper = dapper;
            _photoService = photoService;
        }

        [HttpGet("GetAll")]
        public async Task<List<MstFood>> GetAll()
        {
            var foods = _context.MstFood.ToList().Where(e => e.IsDeleted == false);

            var res = (from food in foods
                       select new MstFood
                       {
                           Id = food.Id,
                           Name = food.Name,
                           Description = food.Description,
                           Price = food.Price
                       }).ToList();
            return res;
        }


        private async Task Create(FoodDto input)
        {
            var Name = _context.MstFood.FirstOrDefault(e => e.Name.ToLower() == input.Name.ToLower());
            if (Name != null)
            {
                throw new UserFriendlyException("tên đồ ăn đã tồn tại");
            }
            else
            {
                var food = _mapper.Map<MstFood>(input);
                _context.MstFood.Add(food);
                await _context.SaveChangesAsync();
            }
        }



        private async Task Edit(FoodDto input)
        {
            var item = _context.MstFood.FirstOrDefault(e => e.Id == input.Id);
            var food = _mapper.Map(input, item);
            _context.MstFood.Update(food);
            await _context.SaveChangesAsync();
        }
        [HttpPost("createOrEdit")]
        public async Task CreateOrEdit(FoodDto createOrEdit)
        {
            if (createOrEdit.Id == null)
            {
                await Create(createOrEdit);
            }
            else await Edit(createOrEdit);
        }

        [HttpDelete("Delete")]
        public async Task Delete(long Id)
        {
            var food = _context.MstFood.FirstOrDefault(e => e.Id == Id);
            _context.MstFood.Remove(food);
            await _context.SaveChangesAsync();
        }
    }
}
