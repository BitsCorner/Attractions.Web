using Attractions.Web.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Attractions.Web.Repository
{
    public interface IAttractionsRepository
    {
        Task AddListing(Listing listing);
        Task<Listing> GetListings();
    }
}
