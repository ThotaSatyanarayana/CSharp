using System;
class armstrong{
	static void Main(){
		Console.WriteLine("Enter a Number");
		int n=int.Parse(Console.ReadLine());
		double s=0;
		int r,c=0,temp;
		temp=n;
		//m=n;
		/*do{
		c++;
		m=m/10;
			
		} 
		while(m!=0);*/
		//m=n;
		while(n>0)
		{
			r=n%10;
			c=r*r*r;
			s=s+c;
			n=n/10;
		}
		n=temp;
		
		if(n==s){
			int n=s+n;
			Console.WriteLine("armstrong number");
		}
		
		else{
			s=s+c;
			Console.WriteLine("not armstrong number");
		}
	}
}