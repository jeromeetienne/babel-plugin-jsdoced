/**
 * test if it is odd
 * @param {Number} n - a number
 */
function isOdd(n) {
	{
		console.assert(typeof n === 'number', "Invalid type for Params 0 n");
	}

	if (n % 2) {
		console.log(n, 'is odd');
	} else {
		console.log(n, 'is even');
	}
}

// Now lets use this function
isOdd(0);
isOdd(1);
isOdd('foo');
