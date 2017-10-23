using System;
using System.Collections.Generic;
using System.Text;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using angular2aspnet.DBContext;
using Newtonsoft.Json;

namespace angular2aspnet.Controllers
{
    public class BaseAPIController : ApiController
    {
        protected readonly testDBEntities BookDB = new testDBEntities();

        protected HttpResponseMessage ToJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
            return response;
        }
    }
}
