using Attractions.Web.Entities.Model;
using Attractions.Web.Entities;
using Attractions.Web.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Attractions.Web.Processor
{
    public class AttractionsProcessor :IAttractionsProcessor
    {
        private IGoogleRepository googleRepository;
        private IAttractionsRepository attractionsRepository;

        public AttractionsProcessor(IGoogleRepository googleRepository, IAttractionsRepository attractionsRepository)
        {
            this.attractionsRepository = attractionsRepository;
            this.googleRepository = googleRepository;
        }
        public async Task<AttractionsIndexModel> GetAttractionsIndexModel()
        {
            var model = new AttractionsIndexModel()
            {
                //Listings = this.attractionsRepository.GetListings(),
                //Locations = this.googleRepository
            };
            return model;
        }

        public async Task<IEnumerable<Location>> GetLocations(string location)
        {
            return await googleRepository.GetLocations(location);
        }
    }
}
