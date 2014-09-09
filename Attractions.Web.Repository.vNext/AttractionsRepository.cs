using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Attractions.Web.Repository
{
    public class AttractionsRepository : IAttractionsRepository
    {
        public Task AddListing(Entities.Listing listing)
        {
            throw new NotImplementedException();
        }

        public Task<Entities.Listing> GetListings()
        {
            throw new NotImplementedException();
        }
    }
}
