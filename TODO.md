- see how it support es6
- see how it works in a browser
- test the nested function with return value and jsdoc
  ```
  	/**
  	 * @return {Number} - super return value
  	 */
  	function bla(){
		return 3 + (function(){
			return 'ffff'
		})()
	}
  ```


## ES2015 Support
- see with the arrow Function
- with and without implicit return


## TODO
- options to support
- if no @return specified, assume it MUST return undefined
- Check if the number of parameters is not specified in 
- warn if the jsdoc doesnt match the number of parameters or the return type
