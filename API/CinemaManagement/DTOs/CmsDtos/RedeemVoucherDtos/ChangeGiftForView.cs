namespace CinemaManagement.DTOs.CmsDtos.RedeemVoucherDtos
{
    public class ChangeGiftForView
    {
        public long? Id { get; set; }
        public string ChangeGiftCode { get; set; }
        public string PhoneCus { get; set; }
        public string GiftName { get; set; }
        public long? GiftId { get; set; }
        public long? CusId { get; set; }
        public bool UsedStatus { get; set; }
    }
}
