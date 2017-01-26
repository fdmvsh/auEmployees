using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using Auasp.Data;
using System.Globalization;

namespace Auasp.Controllers {
    [Route("api/[controller]")]
    public class EmployeeController : Controller {
        public IEmployeeRepository Repo { get; set; }

        public EmployeeController([FromServices] IEmployeeRepository repo) {
            Repo = repo;
        }

        [HttpPost]
        public IActionResult Post([FromBody] Employee employee) {
            if(!ModelState.IsValid) return BadRequest();
            try {
                employee.FormerPositions = employee.Position + " ["
                    + employee.StartDate.ToString("d") + " to ";
                var employeeId = Repo.AddEmployee(employee);
                var url = Url.RouteUrl("GetEmployeeByIdRoute", new { id = employeeId }, Request.Scheme,
                    Request.Host.ToUriComponent());
                return Created(url, employee);
            } catch(Exception ex) {
                return BadRequest();
            }
        }

        [HttpGet]
        public IEnumerable<Employee> Get() {
            return Repo.GetAllEmployees();
        }

        [HttpGet("[action]")]
        public IEnumerable<Employee> Employees() {
            return Repo.GetAllEmployees();
        }

        [HttpGet("[action]")]
        public IEnumerable<string> Positions() {
            return Employee.getPositions();
        }

        [HttpGet("{_id}")]
        [Route("{_id}", Name = "GetEmployeeByIdRoute")]
        public Employee Get(string _id) {
            return Repo.GetEmployeeById(_id);
        }

        [HttpPut]
        [Route("{_id}")]
        public IActionResult Put(string _id, [FromBody] Employee employee) {
            try {
                if(!ModelState.IsValid) {
                    return BadRequest();
                }
                var origEmployee = Repo.GetEmployeeById(_id);
                if(origEmployee == null) return NotFound();
                if(origEmployee.Position != employee.Position)
                    employee.FormerPositions += DateTime.Today.ToString("d") + "]\n"
                        + employee.Position + " [" + DateTime.Today.ToString("d") + " to ";
                Repo.EditEmployee(_id, employee);
                return new ObjectResult(employee);
            } catch(Exception) {
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("{_id}")]
        public IActionResult Delete(string _id) {
            try {
                if(Repo.GetEmployeeById(_id) == null) return NotFound();
                Repo.DeleteEmployee(_id);
                return new StatusCodeResult(200);
            } catch(Exception) {
                return BadRequest();
            }
        }
    }
}