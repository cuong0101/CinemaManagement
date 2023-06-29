using Abp.UI;
using CinemaManagement.DTOs.CmsDtos.MstRankPointsDtos;
using CinemaManagement.DTOs.CmsDtos;
using CinemaManagement.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using AutoMapper;
using CinemaManagement.Data;
using CinemaManagement.Controllers.CMSController;
using CinemaManagement.DTOs.CmsDtos.BookingDtos;
using System.Collections.Generic;
using CinemaManagement.DTOs.CmsDtos.RedeemVoucherDtos;
using System.Linq;
using CinemaManagement.Migrations;

namespace CinemaManagement.Controllers.CmsController
{
    public class RedeemVoucherController : BaseApiController
    {

        private readonly DataContext _context;
        private readonly DapperContext _dapper;

        public RedeemVoucherController(IMapper mapper, DataContext context, DapperContext dapper) : base(mapper)
        {
            _context = context;
            _dapper = dapper;
        }

        [HttpGet("RedeemVoucher")]
        public async Task<List<ChangeGiftForView>> RedeemVoucher([FromQuery] ChangeGiftInput input)
        {
            var query = (from change in _context.HistoryChangeGift.Where(e => e.UsedStatus == false && e.IsDeleted == false)
                         join cus in _context.MstCustomer.Where(e => e.IsDeleted == false) on change.CusId equals cus.Id
                         join gift in _context.PolicyGift.Where(e => e.IsDeleted == false) on change.GiftId equals gift.Id
                         where (!input.CusId.HasValue || change.CusId == input.CusId)
                         && (string.IsNullOrWhiteSpace(input.ChangeGiftCode) || change.ChangeGiftCode == input.ChangeGiftCode)
                         select new ChangeGiftForView
                         {
                             Id = change.Id,
                             ChangeGiftCode = change.ChangeGiftCode,
                             CusId = cus.Id,
                             GiftId = gift.Id,
                             GiftPoint = gift.Point,
                             PhoneCus = cus.Phone,
                             GiftName = gift.GiftName
                         }).ToList();
            return query;
        }

        [HttpGet("GetAllRedeemVoucher")]
        public async Task<List<ChangeGiftForView>> GetAllRedeemVoucher([FromQuery] ChangeGiftInput input)
        {
            var query = (from change in _context.HistoryChangeGift.Where(e => e.IsDeleted == false)
                         join cus in _context.MstCustomer.Where(e => e.IsDeleted == false) on change.CusId equals cus.Id
                         join gift in _context.PolicyGift.Where(e => e.IsDeleted == false) on change.GiftId equals gift.Id
                         where (!input.CusId.HasValue || input.CusId == change.CusId)
                         && (string.IsNullOrWhiteSpace(input.ChangeGiftCode) || input.ChangeGiftCode == change.ChangeGiftCode)
                         select new ChangeGiftForView
                         {
                             Id = change.Id,
                             ChangeGiftCode = change.ChangeGiftCode,
                             CusId = cus.Id,
                             GiftId = gift.Id,
                             GiftPoint = gift.Point,
                             PhoneCus = cus.Phone,
                             GiftName = gift.GiftName,
                             UsedStatus = change.UsedStatus

                         }).ToList();
            return query;
        }
        [HttpPost("CreateRedeemVoucher")]
        public async Task CreateVoucher(long giftId, long cusId, int giftPoint)
        {
            var voucher = new HistoryChangeGift();
            var checkGiftCode = "DQ_" + GiftCodeRandom();
            var historyChangeGifts = _context.HistoryChangeGift.ToList();
            var check = historyChangeGifts.FirstOrDefault(e => e.ChangeGiftCode == checkGiftCode);
            while (check != null)
            {
                checkGiftCode = "DQ_" + GiftCodeRandom();
                check = historyChangeGifts.FirstOrDefault(e => e.ChangeGiftCode == checkGiftCode);
            }
            voucher.ChangeGiftCode = checkGiftCode;
            voucher.CusId = cusId;
            voucher.GiftId = giftId;
            _context.HistoryChangeGift.Add(voucher);

            //trừ điểm tiêu dùng của KH
            var cus = _context.MstCustomer.FirstOrDefault(e => e.Id == cusId);
            cus.CusPoint -= giftPoint;
            await _context.SaveChangesAsync();
        }

        [HttpPost("UpdateRedeemVoucher")]
        public async Task UpdateVoucher(string changeGiftCode)
        {
            var history = _context.HistoryChangeGift.FirstOrDefault(e => e.ChangeGiftCode == changeGiftCode);
            history.UsedStatus = true;
            _context.HistoryChangeGift.Update(history);
            await _context.SaveChangesAsync();
        }

        private string GiftCodeRandom()
        {
            Random random = new Random();
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            string giftCode = new string(Enumerable.Repeat(chars, 10)
                .Select(s => s[random.Next(s.Length)]).ToArray());
            return giftCode;
        }
    }


}
