sample-es6-testbed:
	babel --presets=es2015 --plugins ../babel-jsdoced.js ./examples/sample-es6-testbed.js

sample-es6-arrowfunction-implicitreturn:
	babel --plugins ../babel-jsdoced.js ./examples/sample-es6-arrowfunction-implicitreturn.js

sample-es6-arrowfunction-explicitreturn:
	babel --plugins ../babel-jsdoced.js ./examples/sample-es6-arrowfunction-explicitreturn.js

sample-functiondeclaration:
	babel --plugins ../babel-jsdoced.js ./examples/sample-functiondeclaration.js

sample-functionexpression:
	babel --plugins ../babel-jsdoced.js ./examples/sample-functionexpression.js

test:
	babel --plugins ../babel-jsdoced.js ./examples/test-params.js | node
