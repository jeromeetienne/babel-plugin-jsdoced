- test with es6 and with jsx
- how to test on a large project ?
- make a video ala crazy javascript guy
- make a master branch which is working
  - so no return handling
  - aka put it on options and default to false
- intuition about return parsing. i like it
  - put the visitor of return statement at the root level
  - when finding a return, get the parent function, and see if there is a jsdocJson attached. use Symbol()
  - when finding a symbol, process the parameters and store the jsdocJson 
- this cause the parser to crash
  ``` (function(){})()```
  - FunctionExpression is not good. it seems to assume it is ```var foo = function(){}```
---
- DONE test arrow Function
  - with implicit return
  - with explicit return

- DONE implement testing
  - use mocha
  - link with npm test
  - see about triggering github auto test
- should i write a presets ?
- DONE clean up node_modules
- DONE see how it works in a browser
- DONE what about sourceMap
- DONE check if the plugin name is the proper one
- DONE see how it support es6

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
  - see https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-plugin-options
- if no @return specified, assume it MUST return undefined
- options 
  - noParamCheck=true
  - noReturnCheck
- Check if the number of parameters is not specified in 
- warn if the jsdoc doesnt match the number of parameters or the return type
