sample-jsx-react:
	babel --presets=react --plugins ../transformbabel-jsdoced.js ./examples/sample-jsx-react.js

sample-functionreturnnested:
	babel --plugins ../transformbabel-jsdoced.js ./examples/sample-functionreturnnested.js

sample-es6-testbed:
	babel --presets=es2015 --plugins ../transformbabel-jsdoced.js ./examples/sample-es6-testbed.js

sample-es6-arrowfunction-implicitreturn:
	babel --plugins ../transformbabel-jsdoced.js ./examples/sample-es6-arrowfunction-implicitreturn.js

sample-es6-arrowfunction-explicitreturn:
	babel --plugins ../transformbabel-jsdoced.js ./examples/sample-es6-arrowfunction-explicitreturn.js

sample-functiondeclaration:
	babel --plugins ../transformbabel-jsdoced.js ./examples/sample-functiondeclaration.js

sample-functionexpression:
	babel --plugins ../transformbabel-jsdoced.js ./examples/sample-functionexpression.js

sourcemaps-test:
	babel --plugins ../transformbabel-jsdoced.js --source-maps=true ./examples/sample-functiondeclaration.js

browser-sourcemaps:
	babel --plugins ../transformbabel-jsdoced.js  --source-maps=true ./examples/browser-sourcemaps.js  -o ./examples/browser-sourcemaps-build.js
	@echo Now goto http://127.0.0.1:8080/examples/browser-sourcemaps.html

test:
	babel --plugins ../transformbabel-jsdoced.js ./examples/test-params.js | node
