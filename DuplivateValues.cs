
using System;
class Noduplicatevalues{
		public static int[] removeDiplicates(int[] arr,int n){
			int i,j,k;
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
			Console.WriteLine("n value={0}",n);
			Console.WriteLine("After Revoming Duolicate Values");
			for(i=0;i<n;i++){
			Console.WriteLine(arr[i]);
		}
			return arr;
		}

	static void Main(string[] arrs){
		int n,i;
		int[]arr=new int[50];
		Console.WriteLine("Enter the Array size:");
		n=int.Parse(Console.ReadLine());
		Console.WriteLine("Enter the Elements:");
		for(i=0;i<n;i++){
			arr[i]=int.Parse(Console.ReadLine());
		}
		int[] result=removeDiplicates(arr,n);
		
    }
}
