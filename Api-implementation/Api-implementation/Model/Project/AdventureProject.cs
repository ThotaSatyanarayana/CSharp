using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api_implementation.Model.Project
{
    public class AdventureProject
    {
        [ConfigurationKeyName("")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]




        /* public int? BusinessEntityID { get; set; }
         public int? NationalIDNumber { get; set; }
         public string? LoginID { get; set; }
         public string? OrganizationNode { get; set; }
         public int? OrganizationLevel { get; set; }
         public string? JobTitle { get; set; }
         public DateTime? BirthDate { get; set; }
         public string? MaritalStatus { get; set; }
         //  public string Work_permit_expiration_date = System.DBNull.Value.ToString();
         // public bool Work_permit_expiration_date { get; set; }
         public string? Gender { get; set; }
         public DateTime? HireDate { get; set; }
         public int? SalariedFlag { get; set; }
         public int? VacationHours { get; set; }

         public int? SickLeaveHours { get; set; }

         public int? CurrentFlag { get; set; }


         public string? rowguid { get; set; }

         public DateTime? ModifiedDate { get; set; }


       } */
        public string? CountryRegionCode { get; set; }
        public string? Name { get; set; }
        public DateTime? Modifieddate { get; set; }

        public ActionResult<AdventureProject> UpdateAdventureProject(AdventureProject adventureProject)
        {
            throw new NotImplementedException();

            CountryRegionCode = adventureProject.CountryRegionCode;
            Name = adventureProject.Name.ToString();
            DateTime Modifieddate = (DateTime)adventureProject.Modifieddate;

            return adventureProject;
        }

        internal static void Add(HttpRequest request)
        {
            throw new NotImplementedException();
        }
    }
}

