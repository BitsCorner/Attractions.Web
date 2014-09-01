using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Attractions.Web.Entities.Model
{
    public class AttractionsIndexModel
    {
        public IEnumerable<Location> Locations { get; set; }
        public IEnumerable<Listing> Listings { get; set; }

    }
}
