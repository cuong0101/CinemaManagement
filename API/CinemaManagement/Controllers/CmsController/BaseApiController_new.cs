using AutoMapper;
using CinemaManagement.Interfaces;
using CoreApiResponse;
using Microsoft.AspNetCore.Mvc;

namespace CinemaManagement.Controllers.CmsController
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController_new : BaseController
    {
        public readonly IMapper _mapper;
        public BaseApiController_new(IMapper mapper)
        {
            _mapper = mapper;
        }

        public ISessionService session { get; set; }

    }
}
