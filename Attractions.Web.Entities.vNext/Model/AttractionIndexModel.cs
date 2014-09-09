using System;
using System.Collections.Generic;
using System.Text;

namespace Attractions.Web.Entities.Model
{
    public class AttractionsIndexModel
    {
        public IEnumerable<Location> Locations { get; set; }
        public IEnumerable<Listing> Listings { get; set; }

    }
}
