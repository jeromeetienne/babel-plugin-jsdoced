- make it its own repository
- call that the babel-plugin-transform-jsdocedjs
- handle function declaration and expression too

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
