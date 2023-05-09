namespace CinemaManagement.DTOs.CmsDtos
{
    public class CmsCommonDto<T>
    {
        public int Code { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
    }
}
