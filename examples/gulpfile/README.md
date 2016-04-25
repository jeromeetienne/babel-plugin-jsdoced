This is an example of using babel-plugin-transform-jsdoced in a gulpfile.js.
This gulpfile.js is for a library ```nicelib.js```. It is a fake library
built up for the example. All the source of the library is ```/src```.

This gulpfile.js will build 3 versions of the library:

- nicelib.js - the library itself, just a concat of the whole ```src/```
- nicelib-debug.js - the library compiled thru jsdoced - good for 
- nicelib-min.js - the library minified, good for production


### Notes on eslint
It makes clever use of eslint during the build-debug process. 
It will use [eslint-jsdoc](http://eslint.org/docs/rules/valid-jsdoc)
to check jsdoc comments matches the code.
Thus if there inconsistencies detected, you will be warned immediatly.
