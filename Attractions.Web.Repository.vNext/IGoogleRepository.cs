using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Attractions.Web.Entities;

namespace Attractions.Web.Repository
{
    public interface IGoogleRepository
    {
        Task<IEnumerable<LocationPrediction>> GetLocations(string location);
    }
}
