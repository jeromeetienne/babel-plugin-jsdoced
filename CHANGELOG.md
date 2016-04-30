# v1.2.6-dev
- implemented reporting error as exception optional
   - console.assert()
   - throw new TypeError()
- added options
  - minimalReturn : true/false - if true, try not to put ```return``` into a block statement (default). if false, always put a block statement
  - errorType : 'assert'/'exception' - if equal to 'assert', errors are notified by ```console.assert()```. 
    if equal to 'exception', notify errors by ```throw TypeError()```
- started plugin-jsdoced-property - try to apply type check for property too 
  - still in beta

# v1.2.5
- added examples for eslintrc 
- added gulpfile examples 
- renamed repo into babel-plugin-jsdoced

# v1.2.4
- removed silly debug log

# v1.2.3
- wrote example for eslint jsdoc - http://eslint.org/docs/rules/valid-jsdoc
- wrote example for .babelrc
- clean up code generation 
  - only to add block scope ```{}``` only when necessary
  - useful mainly for return e.g. ```if(cond) return true;```

# v1.2.1
- wrote test and examples for react jsx
- wrote test and examples for es2015 arrow function

# v1.1.0
- wrote a test suite with mocha
- support for es2015 arrow function

# v1.0.0
- Support for function return
- fix in function expression to support functionCall syntax

# v0.7.0
- Support for function expression

# v0.6.0
- function arguments are now checked based on the jsdoc of this function
- works only on function declaration

# v0.5.0
- first version
- not workable, barely parsing jsdoc
