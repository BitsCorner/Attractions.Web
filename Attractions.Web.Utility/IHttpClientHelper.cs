using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Attractions.Web.Utility
{
    public interface IHttpClientHelper
    {
        Task<HttpResponseMessage> CallHttpClientPost(string requestUri, HttpContent requestBody);
        Task<HttpResponseMessage> CallHttpClientPut(string requestUri, HttpContent requestBody);
        Task<HttpResponseMessage> CallHttpClientGet(string requestUri);
    }

}
