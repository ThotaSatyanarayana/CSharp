using Microsoft.Data.SqlClient;
using System.Data;

namespace CRUDAppDotnetCore.Models
{
        // Data Access leyer
    public class DAL 
    {
        public Response GetAllEmployes(SqlConnection connection)
        {
            Response response = new Response();
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM tblCurdNetCore",connection);
            DataTable dt = new DataTable();
            List<Employee> lstEmployees = new List<Employee>();
            da.Fill(dt);
            if(dt.Rows.Count>0)
            {
                for(int i = 0; i < dt.Rows.Count; i++)
                {
                    Employee employee = new Employee();
                    employee.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                    employee.Name = Convert.ToString(dt.Rows[i]["Name"]);
                    employee.Email = Convert.ToString(dt.Rows[i]["Emai"]);
                    employee.IsActive = Convert.ToInt32(dt.Rows[i]["IsActive"]);
                    lstEmployees.Add(employee);

                }
                
            }
            if(lstEmployees.Count>0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Data found";
                response.listEmployees = lstEmployees;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No Data found";
                response.listEmployees = null;
            }

            return response;
        }


        public Response GetAllEmployeById(SqlConnection connection, int id)
        {
            Response response = new Response();
            SqlDataAdapter da = new SqlDataAdapter("select * from tblCurdNetCore where ID'"+id+"'AND IsActive=1", connection);
            DataTable dt = new DataTable();
            Employee Employees = new Employee();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                    Employee employee = new Employee();
                    employee.Id = Convert.ToInt32(dt.Rows[0]["Id"]);
                    employee.Name = Convert.ToString(dt.Rows[0]["Name"]);
                    employee.Email = Convert.ToString(dt.Rows[0]["Emai"]);
                    employee.IsActive = Convert.ToInt32(dt.Rows[0]["IsActive"]);
                response.StatusCode = 200;
                response.StatusMessage = "Data found";
                response.Employee = employee;



            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No Data found";
                response.Employee = null;
            }

            return response;
        }



        public Response AddEmployee(SqlConnection connection, Employee employee)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("Insert into tblCurdNetCore(Name,Email,IsActive,CreatedOn) Values('"+ employee.Name+ "','"+ employee.Email+ "','"+ employee.IsActive+ "',GETDATE())", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Insert Employee Data";
            }

            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No Data Inserted";

            }

            return response;
        }


        public Response UpdateEmployee(SqlConnection connection, Employee employee)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("Update tblCurdNetCore set Name= '" + employee.Name + "',Email='" + employee.Email + "' where ID= '"+employee.Id+"'", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Employee Updated";
            }

            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No Data Updated";

            }

            return response;
        }

        public Response DeleteEmployee(SqlConnection connection ,int id)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("Delete from tblCurdNetCore where ID='" + id + "'", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if(i>0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Employee deleted";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No Employee deleted";
            }

            return response;
        }




    }

}
