using AutoMapper;
using CinemaManagement.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CinemaManagement.Controllers.CMSController
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        public readonly IMapper _mapper;
        public BaseApiController(IMapper mapper)
        {
            _mapper = mapper;
        }

        public ISessionService session { get; set; }
       
    }
}
