using AutoMapper;
using CinemaManagement.Data;
using CinemaManagement.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IISIntegration;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaManagement.Controllers.CmsController
{
    public class BookingController : BaseApiController_new
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly DapperContext _dapper;

        public BookingController(DataContext context, ITokenService tokenService, DapperContext dapper, IMapper mapper):base(mapper)
        {
            _context = context;
            _tokenService = tokenService;
            _dapper = dapper;
        }

        [HttpPost("BookingTicket")]
        public async Task AdminBookingTicket(List<long> listIdTicket, int action, long? IdCus)
        {
            //action 0: từ màn hình chọn vé, click vào nút đặt vé => trạng thái vé 0->1
            //action 1: từ màn thông tin đơn vé, click back => huỷ bỏ trạng thái vé 1->0
            //action 2: từ màn thông tin đơn vé, click thanh toán => trạng thái vé 1->2
            //trong vòng 5p nếu không thanh toán -> chuyển trạng thái 1->2 thì vé sẽ quay về trạng thái 0
            foreach(var idmovie in listIdTicket)
            {
                var ticket = _context.MstTicket
                    .Where(e => e.IsDeleted == false && e.Id == idmovie).FirstOrDefault();
                if(action == 0)
                    ticket.Status = 1;
                if (action == 1)
                    ticket.Status = 0;
                if (action == 2)
                    ticket.Status = 2;

                if (ticket.Status == 2)
                    ticket.CustomerId = IdCus;
                _context.MstTicket.Update(ticket);
                await _context.SaveChangesAsync();
            }
        }
    }
}
