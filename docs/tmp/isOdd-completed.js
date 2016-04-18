/**
 * test if a number is odd or even
 * @param {Number} n - value to test
 */
function isOdd(n){
	if( n % 2 ){
		console.log(n, 'is odd')
	}else{
		console.log(n, 'is even')
	}
}

// Let's check this function with valid arguments
isOdd(0)
isOdd(1)
// Now let's check an invalid argument with a string.
isOdd('foo')
