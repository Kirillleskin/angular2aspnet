using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Net.Http;
using System.Web.Http;
using angular2aspnet.DBContext;

namespace angular2aspnet.Controllers
{
    public class BookAPIController : BaseAPIController
    {
        public HttpResponseMessage Get()
        {
            return ToJson(BookDB.Books.AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]Book value)
        {
            BookDB.Books.Add(value);
            return ToJson(BookDB.SaveChanges());
        }

        public HttpResponseMessage Put(int id, [FromBody]Book value)
        {
            BookDB.Entry(value).State = EntityState.Modified;
            return ToJson(BookDB.SaveChanges());
        }
        public HttpResponseMessage Delete(int id)
        {
            BookDB.Books.Remove(BookDB.Books.FirstOrDefault(x => x.Id == id));
            return ToJson(BookDB.SaveChanges());
        }
    }
}
