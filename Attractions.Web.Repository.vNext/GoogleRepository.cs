using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Attractions.Web.Entities;
using Attractions.Web.Utility;
using System.Net;
using Newtonsoft.Json;

namespace Attractions.Web.Repository
{
    public class GoogleRepository : IGoogleRepository
    {
        IHttpClientHelper httpClient;
        public GoogleRepository(IHttpClientHelper httpClient)
        {
            this.httpClient = httpClient;
        }
        public async Task<IEnumerable<LocationPrediction>> GetLocations(string location)
        {
            //var url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+ location + "&types=(cities)&key=" + "AIzaSyBQVuVXZpAZxhKuv5h6gVct0IUSrHbUUyc";
            var url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + location + "&types=(cities)&key=" + "AIzaSyCmRdR33uhc0Bd7V_RkDu3q2xXwb1Tjmms";
            
            var result = await this.httpClient.CallHttpClientGet(url);
            var content = await result.Content.ReadAsStringAsync();
            try
            {
                var locations = JsonConvert.DeserializeObject<Predictions>(content);
                return locations.predictions;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }
    }
}
