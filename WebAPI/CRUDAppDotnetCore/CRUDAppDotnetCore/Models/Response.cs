namespace CRUDAppDotnetCore.Models
{
    public class Response
    {
        public int StatusCode { get; set; }
        public string StatusMessage { get; set; }
        public Employee Employee { get; set; }
        public List<Employee> listEmployees { get; set; }

    }
}
