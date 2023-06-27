using AutoMapper;
using CinemaManagement.Controllers.CMSController;
using CinemaManagement.Data;
using CinemaManagement.DTOs.CmsDtos;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Dapper;
using CinemaManagement.Entities;
using Abp.UI;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Text;
using System.Xml.Linq;
using System;

namespace CinemaManagement.Controllers.CmsController
{
    public class PolicyGiftsController : BaseApiController
    {
        private readonly DataContext _dataContext;
        private readonly DapperContext _dapper;
        public PolicyGiftsController(DataContext dataContext, DapperContext dapper, IMapper mapper) : base(mapper)
        {
            _dataContext = dataContext;
            _dapper = dapper;
        }
        [AllowAnonymous]
        [HttpGet("GetAll")]
        public async Task<List<PolicyGiftsDto>> GetAll()
        {
            using (var conn = _dapper.CreateConnection())
            {
                var cus = await conn.QueryAsync<PolicyGiftsDto>(@"Select * from PolicyGift where isDeleted = 0");
                return cus.ToList();
            }
        }
        [HttpGet("{id}", Name = "GetPolicyGiftById")]
        public async Task<PolicyGiftsDto> GetPolicyGift(long id)
        {
            using (var conn = _dapper.CreateConnection())
            {
                var cus = await conn.QueryAsync<PolicyGiftsDto>(@"
                Select * from PolicyGift where isDeleted = 0 and id = " + id);
                return cus.FirstOrDefault();
            }
        }

        [HttpPost("createOrEdit")]
        public async Task CreateOrEdit(PolicyGiftsDto createOrEdit)
        {
            if (createOrEdit.Id == null)
            {
                await Create(createOrEdit);
            }
            else await Edit(createOrEdit);
        }
        private async Task Create(PolicyGiftsDto createOrEdit)
        {
           
            var PolicyGift = _dataContext.PolicyGift.FirstOrDefault(e => e.Id == createOrEdit.Id);

            if (PolicyGift != null )
            {
                throw new UserFriendlyException("Đã tồn tại PolicyGift");
            }
            else
            {
                var policyGift = _mapper.Map<PolicyGifts>(createOrEdit);
                _dataContext.PolicyGift.Add(policyGift);
                await _dataContext.SaveChangesAsync();
            }
        }
        private async Task Edit(PolicyGiftsDto PolicyGift)
        {
            var GiftName = _dataContext.PolicyGift.FirstOrDefault(e => e.Id == PolicyGift.Id);
            var policyGift = _mapper.Map(PolicyGift, GiftName);
            policyGift.GiftName = PolicyGift.GiftName;
            policyGift.Point = (int)PolicyGift.Point;
            policyGift.IsStatus = (bool)PolicyGift.IsStatus;
            policyGift.FromDate = (DateTime)PolicyGift.FromDate;
            policyGift.ToDate = (DateTime)PolicyGift.ToDate;
            policyGift.Description = PolicyGift.Description;
            _dataContext.PolicyGift.Update(policyGift);
            await _dataContext.SaveChangesAsync();
        }
        [HttpDelete("delete/{id}", Name = "DeletePolicyGift")]
        public async Task Delete(long Id)
        {
            var policyGift = _dataContext.PolicyGift.FirstOrDefault(e => e.Id == Id);
            _dataContext.PolicyGift.Remove(policyGift);
            await _dataContext.SaveChangesAsync();
        }

    }
}

