using System;
class Matrix{
	double a,b,c,d,e,f;
	public    Matrix(double a,double b,double c,double d,double e,double f)
        {
            this.a = a;
            this.b = b;
            this.c = c;
			this.d=d;
			this.e=e;
			this.f=f;
            Console.WriteLine("matrix is a=" + a);
            Console.WriteLine("matrix is b=" + b);
            Console.WriteLine("matrix is c=" + c);
			Console.WriteLine("matrix is d="+d);
			Console.WriteLine("Matric is e="+e);
			Console.WriteLine("matrix is f="+f);
        }
	
	
	
	
	
	static void Main()
	{
		Console.WriteLine("ente a matrix is:a,b,c,d,e,f");
        double a = double.Parse(Console.ReadLine());
        double b = double.Parse(Console.ReadLine());
        double c = double.Parse(Console.ReadLine());
		double d = double.Parse(Console.ReadLine());
		double e = double.Parse(Console.ReadLine());
		double f = double.Parse(Console.ReadLine());
		Matrix thota=new Matrix(a,b,c,d,e,f);
		Console.WriteLine(thota);
		double z=(a*d)-(b*c);
	
		double x=((e*d)-(b*f))/z;
		double y=((a*f)-(e*c))/z;
		Console.WriteLine(x);
		Console.WriteLine(y);
 	   
	}

}