using System;
class IfElse{
	int n=9;
	//static intilisation method 
	//non-static method 
	public void StaticEvenOrOdd(){
		Console.WriteLine("static intilisation method");
		if(n%2==0){
			Console.WriteLine("Even Number");
		}else{
			Console.WriteLine("Odd Number");
		}
	}
	//dynamic intilisation method
	//static method 
	public static void DynamicEvenOrOdd(int n){
		Console.WriteLine("Dynamic intilisation method");
		if(n%2==0){
			Console.WriteLine("Even Number");
		}else{
			Console.WriteLine("Odd Number");
		}
	}
	//return integer method 
	public int ValueReturnEvenOrOdd(int n){
		int result;
		Console.WriteLine("ValueReturn method");
		if(n%2==0){
			result=n;
		}else{
			result=n;
		}
		return result;
	}
	
	//condtional operator Or ternary operator method
	public string ConditionalEvenOrOdd(int n){
		Console.WriteLine("conditional operator method");
		return n%2==0?"Even Number":"Odd Number";
	}
	//Boolean Method
	public bool BolEvenOrOdd(int n){
		Console.WriteLine("Boolean method");
		if(n%2==0){
			return true;
		}else{
			return false;
		}
	}	
	public static void Main(string[] args){
		
		//non static method we need to create object to call methods
		IfElse ifelse=new IfElse();
		ifelse.StaticEvenOrOdd();
		Console.WriteLine("Enter N:");
		int n=int.Parse(Console.ReadLine());
		//static method no need to create object directly call with class name
		IfElse.DynamicEvenOrOdd(n);
		int result=ifelse.ValueReturnEvenOrOdd(n);
		Console.WriteLine(result);
		string resultdata=ifelse.ConditionalEvenOrOdd(n);
		Console.WriteLine(resultdata);
		bool resultbool=ifelse.BolEvenOrOdd(n);
		Console.WriteLine(resultbool);
		
	}

}