﻿using Abp.Domain.Entities;
using AutoMapper;
using CinemaManagement.Controllers.CMSController;
using CinemaManagement.Data;
using CinemaManagement.DTOs;
using CinemaManagement.DTOs.CmsDtos;
using CinemaManagement.DTOs.CmsDtos.MstRankPointsDtos;
using CinemaManagement.Entities;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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
        public async Task<CmsCommonDto<ResultPagination<List<MstRankPointsForView>>>> GetAll([FromQuery] MstRankPointsForInput filter)
        {
            var result = new CmsCommonDto<ResultPagination<List<MstRankPointsForView>>>();
            var parameters = new DynamicParameters();
            parameters.Add("@TotalCount", value: 0, dbType: DbType.Decimal, direction: ParameterDirection.Output);
            parameters.Add("@TotalPage", value: 0, dbType: DbType.Decimal, direction: ParameterDirection.Output);
            parameters.Add("@PageNumber", value: filter.PageNumber);
            parameters.Add("@PageSize", value: filter.PageSize);
            parameters.Add("@IsSoftDeleted", value: 0);

            try
            {
                using (var conn = _dapper.CreateConnection())
                {
                    conn.Open();
                    var results = conn.QueryMultiple("GetAllRankPoints", parameters,
                        commandType: System.Data.CommandType.StoredProcedure);
                    var resultPagination = new ResultPagination<List<MstRankPointsForView>>();
                    resultPagination.Value = results.Read<MstRankPointsForView>(true).ToList();
                    resultPagination.TotalCount = (long)parameters.Get<decimal>("@TotalCount");
                    resultPagination.TotalPage = (long)parameters.Get<decimal>("@TotalPage");
                    result.Code = 200;
                    result.Data = resultPagination;
                    conn.Close();
                }
            }
            catch(Exception e)
            {
                result.Message = e.Message;
                result.Code = 500;
            }
            return result;
        }
        [HttpPost("Create")]
        public async Task Create (CreateOrEditRankPointsDto input)
        {
            var rankPoint = _mapper.Map<MstRankPoint>(input);

            _context.MstRankPoints.Add(rankPoint);
            await _context.SaveChangesAsync();
        }

    }
}