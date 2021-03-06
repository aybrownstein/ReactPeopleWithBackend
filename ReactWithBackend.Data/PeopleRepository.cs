using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ReactWithBackend.Data
{
    public class PeopleRepository
    {
        private readonly string _connectionString;

        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new PeopleDbContext(_connectionString);
            return context.People.ToList();
        }

        public void Add(Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void Update(Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Attach(person);
            context.Entry(person).State = EntityState.Modified;
            context.SaveChanges();
        } 

        public void Delete(int id)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
        }

        public Person Get(int id)
        {
            using var context = new PeopleDbContext(_connectionString);
            return context.People.FirstOrDefault(p => p.Id == id);
        }
    }
}
