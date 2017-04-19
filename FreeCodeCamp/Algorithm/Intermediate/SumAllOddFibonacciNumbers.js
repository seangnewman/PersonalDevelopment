/*
Given a positive integer num, return the sum of all odd Fibonacci numbers that are less than or equal to num.

The first two numbers in the Fibonacci sequence are 1 and 1. Every additional number in the sequence is the sum of the two previous numbers. The first six numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8.

For example, sumFibs(10) should return 10 because all odd Fibonacci numbers less than 10 are 1, 1, 3, and 5.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:


Remainder
*/

function sumFibs(num) {
	var sumFibonacci;

	sumFibonacci = function(fib){
		switch(fib){
			case 0:
				return 0;
			case 1:
				return 1;
			default:
				var sumFib = 0;
				var tempFib = 0;
					sumFib = fib + fib-1;
				return sumFib;
		}
	}

	var oddSum = 0;

	var i = 0;
	do{

		console.log(sumFibonacci(i));
		
			oddSum += sumFibonacci(i);	
		
	}while ( i <= num  )
	
  return oddSum;
}

console.log('The Value is ' + sumFibs(3));
