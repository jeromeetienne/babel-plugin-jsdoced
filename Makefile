sample-jsx-react:
	babel --presets=react --plugins ../transform-jsdoced.js ./examples/sample-jsx-react.js

sample-eslint-jsdoc:
	eslint --rule '{valid-jsdoc:["error", {"requireReturn": false}]}' examples/sample-eslint-jsdoc.js

sample-es6-proxy:
	node --harmony_proxies examples/sample-es6-proxy.js

sample-functionreturnnested:
	babel --plugins ../transform-jsdoced.js ./examples/sample-functionreturnnested.js

sample-es6-testbed:
	#babel --presets=es2015 ./examples/sample-es6-testbed.js
	babel --presets=es2015 -plugins ../transform-jsdoced.js ./examples/sample-es6-testbed.js

sample-es6-arrowfunction-implicitreturn:
	babel --plugins ../transform-jsdoced.js ./examples/sample-es6-arrowfunction-implicitreturn.js

sample-es6-arrowfunction-explicitreturn:
	babel --plugins ../transform-jsdoced.js ./examples/sample-es6-arrowfunction-explicitreturn.js

sample-functiondeclaration:
	babel --plugins ../transform-jsdoced.js ./examples/sample-functiondeclaration.js

sample-functionexpression:
	babel --plugins ../transform-jsdoced.js ./examples/sample-functionexpression.js

browser-sourcemaps:
	babel --plugins ../transform-jsdoced.js  --source-maps=true ./examples/browser-sourcemaps.js  -o ./examples/browser-sourcemaps-build.js
	@echo Now goto http://127.0.0.1:8080/examples/browser-sourcemaps.html
