 using Api_implementation.Model.Project;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Neo4jClient;
using System.Data;
using System.Data.SqlClient;

namespace Api_implementation.Controllers
{
    [Route("api/Adventure")]
    [ApiController]
    public class AdventureController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public AdventureController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet] 
        public IEnumerable<AdventureProject> Get()
        {
            var person = GetAdventureProjects();
            return person;
        }
        private IEnumerable<AdventureProject> GetAdventureProjects()
        {
            var persons = new List<AdventureProject>();
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultSQLConnection")))
            {
                var sql = "SELECT * FROM Person.CountryRegion";
                connection.Open();
                using SqlCommand command = new SqlCommand(sql, connection);
                using SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    var PersonCountryRegion = new AdventureProject()
                    {
                        CountryRegionCode = reader["CountryRegionCode"].ToString(),
                        Name = reader["Name"].ToString(),
                        Modifieddate = (DateTime)reader["Modifieddate"],



                    };
                    persons.Add(PersonCountryRegion);
                }

            }
            return persons;
        }

        [HttpGet("{CountryRegionCode}")]
        public async Task<ActionResult<AdventureProject>> GetAdventureProjects(string CountryRegionCode)
        {
            // var person = await _configuration.PersonCountryRegion.FindAsync(CountryRegionCode);
            var person = GetAdventureProjects();
            if (person == null)
            {
                return NotFound();
            }

            return person.FirstOrDefault(u => u.CountryRegionCode == CountryRegionCode);
        }
       
        [HttpPut("{CountryRegionCode}")]
        public IEnumerable<AdventureProject> updateadventureProject(AdventureProject adventure)
        {
            var person = updateadventureProjects(adventure);
            return person;
        }

        private IEnumerable<AdventureProject> updateadventureProjects(AdventureProject adventure)
        {

            var persons = new List<AdventureProject>();
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultSQLConnection")))
            {
                var sql = "UPDATE Person.CountryRegion SET CountryRegionCode = '" + adventure.CountryRegionCode + "', Name = '" + adventure.Name + "', ModifiedDate = '" + adventure.Modifieddate + "' WHERE CountryRegionCode = '" + adventure.CountryRegionCode + "'";
                connection.Open();
                using SqlCommand command = new SqlCommand(sql, connection);
                using SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    var PersonCountryRegion = new AdventureProject()
                    {
                        CountryRegionCode = adventure.CountryRegionCode,
                        Name = adventure.Name,
                        Modifieddate = adventure.Modifieddate,
                    };

                    persons.Add(PersonCountryRegion);
                   
                }
            }
                return persons;
            
        }
       
      
        [HttpPost("{CountryRegionCode}")]
        public IEnumerable<AdventureProject> Add( AdventureProject adventure)
        {

            var person = AddAdventureProjects(adventure);
            return person;
        }
       
          private IEnumerable<AdventureProject> AddAdventureProjects(AdventureProject adventure)
          {
             var persons = new List<AdventureProject>();
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultSQLConnection")))
            {
              //  var sql = "SET IDENTITY_INSERT Person.CountryRegion ON INSERT INTO Person.CountryRegion(CountryRegionCode,Name,Modifieddate) VALUES('" + adventure.CountryRegionCode + "','" + adventure.Name + "','" + adventure.Modifieddate + "')";
                var sql = "INSERT INTO Person.CountryRegion(CountryRegionCode,Name,Modifieddate) VALUES('" + adventure.CountryRegionCode + "','" + adventure.Name + "','" + adventure.Modifieddate + "')";
                connection.Open();
                using SqlCommand command = new SqlCommand(sql, connection);
                using SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    var PersonCountryRegion = new AdventureProject()
                    {
                        /* com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.AddWithValue("@CountryRegionCode", Emp.CountryRegionCode);
                        com.Parameters.AddWithValue("@Lname", Emp.Name);
                         com.Parameters.AddWithValue("@Modifieddate", Emp.Modifieddate);   */

                        CountryRegionCode = " + adventure.CountryRegionCode + ",
                        //CountryRegionCode = "+ adventure.CountryRegionCode",
                        Name = " + adventure.Name + ",
                        Modifieddate = adventure.Modifieddate,



                    };
                    persons.Add(PersonCountryRegion);
                }

            }
                return persons;
            
          }

               [HttpDelete("{CountryRegionCode}")]
             public IEnumerable<AdventureProject> DeleteAdventureProject(AdventureProject adventure)
             {
               var person = DeleteAdventureProjects(adventure);
               return person;
             }
        private IEnumerable<AdventureProject> DeleteAdventureProjects(AdventureProject adventure)
        {
            var persons = new List<AdventureProject>();
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultSQLConnection")))
            {
                // var sql = "DElETE FROM CountryRegionCode = '" + adventure.CountryRegionCode + "', Name = '" + adventure.CountryRegionCode + "', Modifieddate = '" + adventure.Modifieddate + "' WHERE CountryRegionCode = '" + adventure.CountryRegionCode + "'";
               var sql = "DElETE FROM Person.CountryRegion  WHERE CountryRegionCode = '" + adventure.CountryRegionCode + "'";
                connection.Open();
                using SqlCommand command = new SqlCommand(sql, connection);
                using SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    var PersonCountryRegion = new AdventureProject()
                    {

                      //CountryRegionCode = adventure.CountryRegionCode,
                       // Name = adventure.Name,
                      //  Modifieddate = adventure.Modifieddate,



                    }; 
                    persons.Add(PersonCountryRegion);
                }

            }
            return persons;
        } 
    }
    /* [HttpPut("{CountryRegionCode:string}", Name = "UpdateAdventureProjects")]
       public IActionResult UpdateAdventureProjects(string CountryRegionCode, [FromBody] AdventureProject adventure)
       {
          if(adventure == null || CountryRegionCode != adventure.CountryRegionCode)
          {
              return BadRequest();
          }
          var person= Storedb.villaList.FirstOrDefault(u => u.CountryRegionCode == CountryRegionCode)
              person.Name = AdventureProject.name;
          person.Modifieddate = AdventureProject.Modifieddate;


       } */

    //  [HttpPut("{CountryRegionCode,Name,Modifieddate}")]

}

/* [HttpPost]
 public async Task<ActionResult<AdventureProject>> AddPersonCountryRegion(AdventureProject adventure)
 {
     AdventureProject.Add(Request);
     return Ok();
 } */
/*   [HttpPost]


    public  ActionResult Post([FromBody] AdventureProject book)
    {



        var person = new GraphClient(new Uri("https://localhost:44387/api/Adventure"), "neo4j", "1234");
        person.ConnectAsync();


        if (book == null)
            return BadRequest();

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var NewAdventureProject = new AdventureProject { CountryRegionCode = "CountryRegionCode", Name = "Name", Modifieddate = DateTime.MaxValue };
        person.Cypher
          .Merge("(book:AdventureProject { Id: {CountryRegionCode} ,Name:{Name},Modifieddate:{Modifieddate}})")
               .OnCreate()
           .Set("book = {newBook}")
         .WithParams(new
         {
             CountryRegionCode = NewAdventureProject.CountryRegionCode,
             Name = NewAdventureProject.Name,
             Modifieddate = NewAdventureProject.Modifieddate,
             NewAdventureProject
         })
        .ExecuteWithoutResultsAsync();

        // CountryRegionCode++;
        return Ok(NewAdventureProject);
    }


}
}
*/








/* [HttpPut("{CountryRegionCode}")]
public void Put(string CountryRegionCode, [FromBody] AdventureProject adventureProject)
{ 
_configuration.AdventureProject.Update(adventureProject);
   _configuration.GetValue();

} 
[HttpPost]
public ActionResult<AdventureProject>createAdventure([FromBody] AdventureProject adventure)
{
   if (adventure == null)
   {
       return BadRequest(adventure);
   }
    if(adventure.CountryRegionCode > 0 )
    {
       return StatusCode(statusCodes.Status500InternetServiceError)
    }

}
}
  [HttpPost]
  public async Task<ActionResult> Post([FromBody] AdventureProject adventure)
  {
      if (adventure == null)
          return BadRequest("Invalid Data");

      await _configuration.Add(adventure);

      return new CreatedAtRouteResult("GetCategory", new { CountryRegionCode = adventure.CountryRegionCode }, adventure);
  } */









