using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Attractions.Web.Utility
{
    public class HttpClientHelper : IHttpClientHelper
    {
        public async Task<HttpResponseMessage> CallHttpClientPost(string requestUri, HttpContent requestBody)
        {
            using (var client = new HttpClient())
            {
                var response = await client.PostAsync(requestUri, requestBody);
                return response;
            }
        }

        public async Task<HttpResponseMessage> CallHttpClientPut(string requestUri, HttpContent requestBody)
        {
            using (var client = new HttpClient())
            {
                var response = await client.PutAsync(requestUri, requestBody);
                return response;
            }
        }

        public async Task<HttpResponseMessage> CallHttpClientGet(string requestUri)
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(requestUri);
                return response;
            }
        }

    }

}
