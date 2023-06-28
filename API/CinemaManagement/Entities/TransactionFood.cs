using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;

namespace CinemaManagement.Entities
{
    public class TransactionFood : FullAuditedEntity<long>, IEntity<long>
    {
        public long FoodId { get; set; }
        public long PersonId { get; set; }
    }
}
