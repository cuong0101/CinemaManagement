using Abp.UI;
using AutoMapper;
using CinemaManagement.Controllers.CMSController;
using CinemaManagement.Data;
using CinemaManagement.DTOs.CmsDtos.MstPromotionDto;
using CinemaManagement.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaManagement.Controllers.CmsController
{
    public class PromotionController : BaseApiController
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public PromotionController(DataContext dataContext, IMapper mapper) : base(mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        [HttpPost("getAll")]
        public async Task<List<MstPromotionForView>> GetAll(MstPromotionInput input)
        {
            var promotionRepo = _dataContext.MstPromotions.ToList();
            var promotionDetailRepo = _dataContext.MstPromotionDetail.ToList();
            var customerRepo = _dataContext.MstCustomer.ToList();

            List<MstPromotionForView> data = new List<MstPromotionForView>();
            List<MstPromotionForView> result =  (from uio in promotionRepo.Where(e => e.IsDeleted == false)
                                                      where (!input.FromDate.HasValue || input.FromDate.Value.Date <= uio.FromDate.Value.Date)
                                                      && (!input.ToDate.HasValue || input.ToDate.Value.Date >= uio.ToDate.Value.Date)
                                                      && (string.IsNullOrWhiteSpace(input.PromotionContent) || uio.PromotionContent.Contains(input.PromotionContent))
                                                      orderby uio.Id descending
                                                      select new MstPromotionForView
                                                      {
                                                          Id = uio.Id,
                                                          FromDate = uio.FromDate,
                                                          ToDate = uio.ToDate,
                                                          PromotionContent = uio.PromotionContent,
                                                          Description = uio.Description,
                                                          PromotionDetails = (from detail in promotionDetailRepo.Where(e => e.PromotionId == uio.Id && e.IsDeleted == false)
                                                                              join cus in customerRepo on detail.CusId equals cus.Id into cusJoined
                                                                              from cus in cusJoined.DefaultIfEmpty()
                                                                              select new MstPromotionDetailDto
                                                                              {
                                                                                  Id = detail.Id,
                                                                                  CusId = cus.Id,
                                                                                  CusName = cus.Name,
                                                                                  PromotionId = detail.PromotionId,
                                                                                  Description = detail.Description,
                                                                              }).ToList(),
                                                      }).ToList();
            return result;
        }
        #region --- Thêm sửa xóa CTKM
        [HttpPost("createOrEdit")]

        public async Task CreateOrEdit(CreateOrEditPromotionDto createOrEdit)
        {
            if (createOrEdit.Id == null)
            {
                await Create(createOrEdit);
            }
            else await Edit(createOrEdit);
        }
        private async Task Create(CreateOrEditPromotionDto input)
        {
            var promotion = _dataContext.MstPromotions.FirstOrDefault(e => e.PromotionContent.ToLower() == input.PromotionContent.ToLower() 
            && e.FromDate == input.FromDate && e.ToDate == input.ToDate);
            if (promotion != null)
            {
                throw new UserFriendlyException("Chương trình khuyến mãi đã tồn tại");
            }
            else
            {
                var promo = _mapper.Map<MstPromotion>(input);
                _dataContext.MstPromotions.Add(promo);
                await _dataContext.SaveChangesAsync();
            }
        }
        private async Task Edit(CreateOrEditPromotionDto input)
        {
            var promotion = _dataContext.MstPromotions.FirstOrDefault(e => e.Id == input.Id);
            var promo = _mapper.Map(input, promotion);
            _dataContext.MstPromotions.Update(promo);
            await _dataContext.SaveChangesAsync();
        }

        [HttpDelete("Deleted")]
        public async Task Delete(long Id)
        {
            var promotion = _dataContext.MstPromotions.FirstOrDefault(e => e.Id == Id);
            _dataContext.MstPromotions.Remove(promotion);
            await _dataContext.SaveChangesAsync(); 
        }
        #endregion

        #region --- Thêm sửa xóa KH CTKM
        [HttpPost("createOrEditDetail")]
        public async Task CreateOrEditDeatil(CreateOrEditPromotionDetailDto createOrEditDetail)
        {
            if (createOrEditDetail.Id == null)
            {
                await CreateDetail(createOrEditDetail);
            }
            else await EditDetail(createOrEditDetail);
        }
        private async Task CreateDetail(CreateOrEditPromotionDetailDto input)
        {
            var promotionDetail = _dataContext.MstPromotionDetail.FirstOrDefault(e => e.CusId == input.CusId && e.PromotionId == input.PromotionId);
            if (promotionDetail != null)
            {
                throw new UserFriendlyException("Khách hàng đã có trong CTKM này");
            }
            else
            {
                var promoDetail = _mapper.Map<MstPromotionDetail>(input);
                _dataContext.MstPromotionDetail.Add(promoDetail);
                await _dataContext.SaveChangesAsync();
            }
        }
        private async Task EditDetail(CreateOrEditPromotionDetailDto input)
        {
            var promotionDetail = _dataContext.MstPromotionDetail.FirstOrDefault(e => e.CusId == input.CusId && e.PromotionId == input.PromotionId);
            if (promotionDetail != null)
            {
                throw new UserFriendlyException("Khách hàng đã có trong CTKM này");
            }
            else
            {
                var promotionDt = _dataContext.MstPromotionDetail.FirstOrDefault(e => e.Id == input.Id);
                var promoDt = _mapper.Map(input, promotionDt);
                _dataContext.MstPromotionDetail.Update(promoDt);
                await _dataContext.SaveChangesAsync();
            }    
        }

        [HttpDelete("DeletedDetail")]
        public async Task Deleteetail(long Id)
        {
            var promotionDetail = _dataContext.MstPromotionDetail.FirstOrDefault(e => e.Id == Id);
            _dataContext.MstPromotionDetail.Remove(promotionDetail);
            await _dataContext.SaveChangesAsync();
        }
        #endregion
    }
}
