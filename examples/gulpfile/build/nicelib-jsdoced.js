/**
 * This is a super function
 * @param {String} myString1 - a super string
 * @param {String} myString2 - a super string
 * @return {String} - super returned string
 */
function myFunctionDeclaration(myString1, myString2) {
  console.assert(typeof myString1 === 'string', "Invalid type for argument 0 myString1");
  console.assert(typeof myString2 === 'string', "Invalid type for argument 1 myString2");

  var _returnValue = myString1 + myString2;

  console.assert(typeof _returnValue === 'string', "Invalid type for return value");
  return _returnValue;
}

console.log('return is ', myFunctionDeclaration('foo', 'bar'));
/**
 * Test if it is odd
 * @param {Number} n - my number
 */
function isOdd(n) {
	console.assert(typeof n === 'number', "Invalid type for argument 0 n");

	if (n % 2) {
		console.log(n + ' is odd');
	} else {
		console.log(n + ' is even');
	}
}

// Let's use this function
isOdd(0);
isOdd(1);
isOdd('foobar');