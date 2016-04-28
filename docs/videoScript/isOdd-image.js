/**
 * Test if it is odd
 * @param {Number} n - my number
 * @return {Boolean} true if it is odd, false otherwise
 */
function isOdd(n){
	return n % 2 ? true : false
}

// Let's use this function
isOdd(0) 
// => false ... all cool.
isOdd(1) 
// => true ... all cool.
isOdd('foobar') 
// => false .. So the wrong argument is not detected in javascript
// ...
// But in jsdoced javascript, it returns
// => AssertionError: Invalid type for Params 0 n

// Cool no ?
