using Abp.Domain.Entities;
using Abp.UI;
using AutoMapper;
using CinemaManagement.Controllers.CMSController;
using CinemaManagement.Data;
using CinemaManagement.DTOs;
using CinemaManagement.DTOs.CmsDtos;
using CinemaManagement.DTOs.CmsDtos.MstPromotionDto;
using CinemaManagement.DTOs.CmsDtos.MstRankPointsDtos;
using CinemaManagement.Entities;
using CinemaManagement.Migrations;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Drawing.Printing;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CinemaManagement.Controllers.CmsController
{
    [Authorize]
    public class MstRankPointsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly DapperContext _dapper;

        public MstRankPointsController(IMapper mapper, DataContext context, DapperContext dapper) : base(mapper)
        {
            _context=context;
            _dapper=dapper;
        }
        [HttpGet("getAll")]
        public async Task<List<MstRankPointsForView>> GetAll([FromQuery] MstRankPointsForInput filter)
        {
            var result = new List<MstRankPointsForView>();
            try
            {
                var rankpoints = _context.MstRankPoints.ToList();
                var benefits = _context.MstBenefitsCus.ToList();
                var query = (from rankpoint in rankpoints
                             select new MstRankPointsForView
                             {
                                 Id = rankpoint.Id,
                                 Grade = rankpoint.Grade,
                                 OperationDate = rankpoint.OperationDate,
                                 ExpirationDate = rankpoint.ExpirationDate,
                                 IsActive = rankpoint.IsActive,
                                 Description = rankpoint.Description,
                                 NumberOfVisit = rankpoint.NumberOfVisit,
                                 Benefits = (from benefit in benefits.Where(e => e.RankPointId == rankpoint.Id && e.IsDeleted == false)
                                            select new MstBenefits
                                            {
                                                    Id = benefit.Id,
                                                    RankPointId = benefit.RankPointId,
                                                    Name = benefit.Name,
                                                    Description = benefit.Description,
                                                }).ToList(),
                             }).ToList();
                result = query;
            }
            catch (Exception e)
            {
                //result.Message = e.Message;
                //result.Code = 500;
            }
            return result;
        }

        #region --- Thêm sửa xóa hạng
        [HttpPost("Create")]
        private async Task Create(CreateOrEditRankPointsDto input)
        {
            var rankPoint = _mapper.Map<MstRankPoint>(input);

            _context.MstRankPoints.Add(rankPoint);
            await _context.SaveChangesAsync();
        }

        private async Task Edit(CreateOrEditRankPointsDto input)
        {
            var rankpoints = _context.MstRankPoints.FirstOrDefault(e => e.Id == input.Id);
            if (rankpoints == null) throw new UserFriendlyException("Không tồn tại");
            var rankpoint = _mapper.Map(input, rankpoints);
            _context.MstRankPoints.Update(rankpoint);
            await _context.SaveChangesAsync();
        }
        [HttpPost("CreateOrEdit")]
        public async Task CreateOrEdit(CreateOrEditRankPointsDto input)
        {
            if (input.Id == null)
            {
                await Create(input);
            }
            else await Edit(input);
        }

        [HttpPost("deleted")]
        public async Task Deleted(long id)
        {
            var rankpoints = _context.MstRankPoints.FirstOrDefault(e => e.Id == id);
            rankpoints.IsDeleted = true;
            _context.MstRankPoints.Update(rankpoints);
            await _context.SaveChangesAsync();
        }
        #endregion

        #region --- Thêm sửa xóa quyền lợi
        [HttpPost("createOrEditBenefit")]
        public async Task createOrEditBenefit(CreateOrEditBenefitDto createOrEditBenefit)
        {
            if (createOrEditBenefit.Id == null)
            {
                await CreateBenefit(createOrEditBenefit);
            }
            else await EditBenefit(createOrEditBenefit);
        }
        private async Task CreateBenefit(CreateOrEditBenefitDto input)
        {
            var benefit = _context.MstBenefitsCus.FirstOrDefault(e => e.RankPointId == input.RankPointId && e.Name == input.Name);
            if (benefit != null)
            {
                throw new UserFriendlyException("Quyền lợi đã tồn tại");
            }
            else
            {
                var cusBenefit = _mapper.Map<MstBenefitsCus>(input);
                _context.MstBenefitsCus.Add(cusBenefit);
                await _context.SaveChangesAsync();
            }
        }
        private async Task EditBenefit(CreateOrEditBenefitDto input)
        {
            var benefit = _context.MstBenefitsCus.FirstOrDefault(e => e.RankPointId == input.RankPointId && e.Name == input.Name);
            if (benefit != null)
            {
                throw new UserFriendlyException("Quyền lợi đã tồn tại");
            }
            else
            {
                var cusBenefit = _context.MstBenefitsCus.FirstOrDefault(e => e.Id == input.Id);
                var saves = _mapper.Map(input, cusBenefit);
                _context.MstBenefitsCus.Update(saves);
                await _context.SaveChangesAsync();
            }
        }

        [HttpPost("deletedBenefit")]
        public async Task DeleteBenefits([Required] long Id)
        {
            var benefit = _context.MstBenefitsCus.FirstOrDefault(e => e.Id == Id);
            _context.MstBenefitsCus.Remove(benefit);
            await _context.SaveChangesAsync();
        }
        #endregion

        #region --- Điểm tích lũy

        [HttpGet("getAllCumulative")]
        public async Task<List<CumulativeForView>> GetAll()
        {
            var rankpoints = _context.MstRankPoints.ToList();
            var cumulatives = _context.CumulativePoints.ToList();

            var query = (from r in rankpoints.Where(e => e.IsDeleted == false)
                         join c in cumulatives.Where(e => e.IsDeleted == false) on r.Id equals c.RankId
                            select new CumulativeForView
                            {
                                Id = c.Id,
                                RankId = r.Id,
                                RankName = r.Grade,
                                Money = c.Money,
                                Point = c.Point
                            }).ToList();
            return query;
        }

        [HttpPost("createOrEditCumulative")]
        public async Task createOrEditCumulative(CreateOrEditCumulativeDto createOrEditCumulative)
        {
            if (createOrEditCumulative.Id == null)
            {
                await CreateCumulative(createOrEditCumulative);
            }
            else await EditCumulative(createOrEditCumulative);
        }
        private async Task CreateCumulative(CreateOrEditCumulativeDto input)
        {
            var benefit = _context.CumulativePoints.FirstOrDefault(e => e.RankId == input.RankId);
            if (benefit != null)
            {
                throw new UserFriendlyException("Giá trị đổi quà đã tồn tại");
            }
            else
            {
                var cusBenefit = _mapper.Map<CumulativePoint>(input);
                _context.CumulativePoints.Add(cusBenefit);
                await _context.SaveChangesAsync();
            }
        }
        private async Task EditCumulative(CreateOrEditCumulativeDto input)
        {
            var cumu = _context.CumulativePoints.FirstOrDefault(e => e.RankId == input.RankId);
            if (cumu != null)
            {
                throw new UserFriendlyException("Giá trị đổi quà đã tồn tại");
            }
            else
            {
                var cumulative = _context.CumulativePoints.FirstOrDefault(e => e.Id == input.Id);
                var saves = _mapper.Map(input, cumulative);
                _context.CumulativePoints.Update(saves);
                await _context.SaveChangesAsync();
            }
        }

        #endregion
    }
}
