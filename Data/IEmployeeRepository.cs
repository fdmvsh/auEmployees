using Auasp.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auasp.Data
{
    public interface IEmployeeRepository
    {
        string AddEmployee(Employee employee);
        IList<Employee> GetAllEmployees();
        Employee GetEmployeeById(string id);
        void EditEmployee(string id, Employee employee);
        void DeleteEmployee(string id);        
    }
}
