using System;
class Noduplicatevalues{

	static void Main(string[] arrs){
		int n,i,j,k;
		int[]arr=new int[50];
		Console.WriteLine("Enter the Array size:");
		n=int.Parse(Console.ReadLine());
		Console.WriteLine("Enter the Elements:");
		for(i=0;i<n;i++){
			arr[i]=int.Parse(Console.ReadLine());
		}
		Console.WriteLine("Your Enter the Array Elements ");
		for(i=0;i<n;i++){
			Console.WriteLine(arr[i]);
			}
			Console.WriteLine("after Removing Duplicate Elements ");
			for(i=0;i<n;i++){
				for(j=i+1;j<n;){
					if(arr[i]==arr[j]){
						for(k=j;k<n;k++){
							arr[k]=arr[k+1];
						}
						n--;
					}
					else
					{
						j++;
					}
				}
			}
			for(i=0;i<n;i++){
				Console.WriteLine(arr[i]);
			}
		Console.ReadLine();
		
    }
}
