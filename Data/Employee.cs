using Auasp.Data;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auasp.Controllers {
    public class Employee {
        public string _id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime StartDate { get; set; }
        public int Salary { get; set; }
        public string Position { get; set; }
        public string FormerPositions { get; set; }
        public string FullName {
            get {
                return FirstName + " " + LastName;
            }
        }

        private static string[] positions = new[]
        {
            "Tester", "Programmer", "Support", "Analyst", "Sales", "Other"
        };
        public static string[] getPositions() {
            return positions;
        }
    }
}