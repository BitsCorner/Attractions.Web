using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Attractions.Web.Entities.Model;

namespace Attractions.Web.Processor
{
    public interface IAttractionsProcessor
    {
        Task<AttractionsIndexModel> GetAttractionsIndexModel();
    }
}
