using Auasp.Controllers;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auasp.Data {
    public class EmployeeRepository : IEmployeeRepository {
        MongoClient client;
        IMongoDatabase database;
        IMongoCollection<Employee> collection;
        public EmployeeRepository() {
            client = new MongoClient("mongodb://localhost:27017");
            database = client.GetDatabase("db");
            collection = database.GetCollection<Employee>("employees");
            DBLoad();
        }

        private List<Employee> employees = new List<Employee>() {
        };

        public string AddEmployee(Employee employee) {
            var _id = ObjectId.GenerateNewId().ToString();
            employee._id = _id;
            employees.Add(employee);
            DBSaveOne(employee);
            return _id;
        }

        public IList<Employee> GetAllEmployees() {
            return employees;
        }

        public Employee GetEmployeeById(string id) {
            return employees.Find(employee => employee._id == id);
        }

        public void EditEmployee(string _id, Employee employee) {
            var filter = Builders<Employee>.Filter.Eq("_id", _id);
            var update = Builders<Employee>.Update.Set("FirstName", employee.FirstName)
                                                  .Set("LastName", employee.LastName)
                                                  .Set("Address", employee.Address)
                                                  .Set("BirthDate", employee.BirthDate)
                                                  .Set("StartDate", employee.StartDate)
                                                  .Set("Salary", employee.Salary)
                                                  .Set("Position", employee.Position)
                                                  .Set("FormerPositions", employee.FormerPositions);
            collection.UpdateOne(filter, update);
            DBLoad();
        }

        public void DeleteEmployee(string id) {;
            var filter = Builders<Employee>.Filter.Eq("_id", id);
            collection.DeleteOne(filter);
            DBLoad();
        }        

        public async void DBSaveAll() {
            foreach(Employee empe in employees) {
                await collection.InsertOneAsync(empe);
            }
        }

        public async void DBSaveOne(Employee emp) {
            await collection.InsertOneAsync(emp);
        }

        public void DBLoad() {
            employees = collection.Find(new BsonDocument()).ToListAsync().GetAwaiter().GetResult();
        }
    }
}
