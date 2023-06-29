using AutoMapper;
using CinemaManagement.Data;
using CinemaManagement.DTOs.CmsDtos;
using CinemaManagement.Interfaces;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaManagement.Controllers.CmsController
{
    public class ReportController : BaseApiController_new
    {
        private readonly DataContext _context;
        private readonly DapperContext _dapper;
        private readonly IPhotoService _photoService;
        public ReportController(DataContext context, DapperContext dapper, IMapper mapper, IPhotoService photoService) : base(mapper)
        {
            _context = context;
            _dapper = dapper;
            _photoService = photoService;
        }

        [HttpGet("DoanhThuPhim")]
        public async Task<List<DoanhThuDto>> DoanhThuPhim(DateTime from, DateTime to)
        {
            using (var conn = _dapper.CreateConnection())
            {
                var res = await conn.QueryAsync<DoanhThuDto>(@"
                EXEC dbo.Doanh_Thu_Phim
                    @from = @fromDate,
                    @to = @toDate",
                new
                {
                    fromDate = from,
                    toDate = to
                });
                return res.ToList();
            }
        }

        [HttpGet("DoanhThuDoAn")]
        public async Task<List<DoanhThuDto>> DoanhThuDoAn(DateTime from, DateTime to)
        {
            using (var conn = _dapper.CreateConnection())
            {
                var res = await conn.QueryAsync<DoanhThuDto>(@"
                EXEC dbo.Doanh_Thu_DoAn
                    @from = @fromDate,
                    @to = @toDate",
                new
                {
                    fromDate = from,
                    toDate = to
                });
                return res.ToList();
            }
        }
    }
}
