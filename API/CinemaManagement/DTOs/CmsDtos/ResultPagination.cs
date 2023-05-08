namespace CinemaManagement.DTOs.CmsDtos
{
    public class ResultPagination<T>
    {
        public long TotalCount { get; set; }
        public long TotalPage { get; set; }
        public T Value { get; set; }
    }
}
