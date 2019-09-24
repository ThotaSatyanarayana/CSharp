using System;
class palindrome{
	public static bool CheckPalindrome(int n){
		int r,rev=0;
		int temp=n;
		while(n>0){
			r=n%10;
			rev=rev*10+r;
			n=n/10;
		}
			if(temp==rev){
				return true;
			}
			else{
				return false;
			}
	}
	public static bool Armstrong(int n){
		/*double s=0;
		
		int m,r,c=0;
		m=n;
		do{
		c++;
		m=m/10;
			
		}
		while(m!=0);
		m=n;
		while(m!=0)
		{
			r=m%10;
			s=s+Math.Pow(r,c);
			m=m/10;
		}
		if(n==s){
			
			return true;
		}
		else{
			return false;
		}
	 */
		 //or simplie process is 
		double s=0;
		int r,c=0,temp;
		
		temp=n;
		while(n>0){
			r=n%10;
			c=r*r*r;
			s=s+c;
			n=n/10;
		}
		n=temp;
		if(n==s){
			
			return true;
		}
		else{
			return false;
		}
	}	
	
		
	
	
	static void Main(){
		Console.WriteLine("enter a number");
		int n=int.Parse(Console.ReadLine());
		for(int i=0;i<=n;i++){
		bool result=CheckPalindrome(i);
			if(result==true){
			Console.WriteLine("palindrome {0}:",i);
			}
		}
		Console.WriteLine();
		for(int i=0;i<=n;i++){
		bool result1=Armstrong(i);
			if(result1==true){
				Console.WriteLine("armstong {0}:",i);
			}
		}	
		
		
		
	}
}