using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;

namespace angular2aspnet.Controllers
{
    public class CategoryAPIController : BaseAPIController
    {
        public HttpResponseMessage Get()
        {
            return ToJson(BookDB.Categories.AsEnumerable());
        }
    }
}