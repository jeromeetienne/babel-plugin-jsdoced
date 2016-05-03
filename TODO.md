- test with property and proxy
  - create another plugin, and use it only in the makefile for now
  - plugin-jsdoced-property.js
- property: make a sample of each jsdoc case. 
- DONE to rename babel-plugin-jsdoced. simpler to read, and type.
- DONE generate console.assert or throw on options
- DONE put types2Conditions into jsdoc parse
- DONE make option reachable via usual babel plugins
- DONE implement travis tests - https://github.com/babel/babel/blob/master/README.md
  
---
- TODO complete the clean return
  - what about the following rules. if parent got a single child. 
- BUG: following code make parser crash 
  ```/**
   * blabla
   */
  class Point {
  }
  ```
- DONE how to handle the function without return at all. aka the one returning undefined
  - what if undefined is allowed ? what if undefined is not allowed ?
  - ANSWER: let eslint handle it.
- write something on how to use it with webpack
  - Webpack plugin for Babel - https://github.com/babel/babel-loader
---
- how to test on a large project ?
---
- DONE test with es6 and with jsx
- DONE test arrow Function
  - with implicit return
  - with explicit return

- DONE implement testing
  - use mocha
  - link with npm test
  - see about triggering github auto test
- should i write a presets ? es2015-jsdoced, react-jsdoced ... for configuration easyness ?
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
