sample-functionreturnnested:
	babel --plugins ../babel-jsdoced.js ./examples/sample-functionreturnnested.js

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

sourcemaps-test:
	babel --plugins ../babel-jsdoced.js --source-maps=true ./examples/sample-functiondeclaration.js

browser-sourcemaps:
	babel --plugins ../babel-jsdoced.js  --source-maps=true ./examples/browser-sourcemaps.js  -o ./examples/browser-sourcemaps-build.js
	@echo Now goto http://127.0.0.1:8080/examples/browser-sourcemaps.html

test:
	babel --plugins ../babel-jsdoced.js ./examples/test-params.js | node
