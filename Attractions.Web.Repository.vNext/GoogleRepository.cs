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
        public async Task<IEnumerable<Location>> GetLocations(string location)
        {
            var url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+ location + "&types=(cities)&key=" + "AIzaSyBQVuVXZpAZxhKuv5h6gVct0IUSrHbUUyc";
            var result = await this.httpClient.CallHttpClientGet(url);
            //if (result.StatusCode != HttpStatusCode.OK)
            //{
            //}
            var content = await result.Content.ReadAsStringAsync();
            var locations = JsonConvert.DeserializeObject<IEnumerable<Location>>(content);
            return locations;
        }
    }
}
