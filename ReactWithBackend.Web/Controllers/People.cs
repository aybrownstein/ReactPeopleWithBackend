using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using ReactWithBackend.Data;


namespace ReactWithBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("GetAll")]
        public List<Person> GetAll()
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.GetAll();
        }

        [HttpPost]
        [Route("Add")]
        public void Add(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Add(person);
        }
    }
}
