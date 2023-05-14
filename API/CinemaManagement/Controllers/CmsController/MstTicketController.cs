using AutoMapper;
using CinemaManagement.Data;
using CinemaManagement.Interfaces;

namespace CinemaManagement.Controllers.CmsController
{
    public class MstTicketController : BaseApiController_new
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly DapperContext _dapper;

        public MstTicketController(DataContext context, ITokenService tokenService, DapperContext dapper, IMapper mapper) : base(mapper)
        {
            _context = context;
            _tokenService = tokenService;
            _dapper = dapper;
        }
    }
}
