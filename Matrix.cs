using System;
class matrix{
	static void Main()
	{
		
		Console.WriteLine("ente a matrix is:a,b,c,d,e,f");
        double a = double.Parse(Console.ReadLine());
        double b = double.Parse(Console.ReadLine());
        double c = double.Parse(Console.ReadLine());
		double d = double.Parse(Console.ReadLine());
		double e = double.Parse(Console.ReadLine());
		double f = double.Parse(Console.ReadLine());
		double z=(a*d)-(b*c);
	
		double x=((e*d)-(b*f))/z;
		double y=((a*f)-(e*c))/z;
		Console.WriteLine(x);
		Console.WriteLine(y);
 	   
 	   
	 	   
	}

}