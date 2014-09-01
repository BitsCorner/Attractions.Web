using Attractions.Web.Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Attractions.Web.Processor
{
    public interface IAttractionsProcessor
    {
        Task<AttractionsIndexModel> GetAttractionsIndexModel();
    }
}
