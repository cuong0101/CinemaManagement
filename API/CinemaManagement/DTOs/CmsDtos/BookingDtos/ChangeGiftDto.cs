namespace CinemaManagement.DTOs.CmsDtos.BookingDtos
{
    public class ChangeGiftDto
    {
        public long? Id { get; set; }
        public string phoneCus { get; set; }
        public string giftName { get; set; }
        public long? giftId { get; set; }
        public long? cusId { get; set; }
        public bool UsedStatus { get; set; }

    }
}
