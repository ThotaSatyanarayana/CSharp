using Microsoft.EntityFrameworkCore;
using Api_implementation.Model;

namespace Api_implementation.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
           
      //  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)


    }
}
