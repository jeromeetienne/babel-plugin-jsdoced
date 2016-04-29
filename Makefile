sample-jsx-react:
	babel --presets=react --plugins ../plugin-jsdoced.js ./examples/sample-jsx-react.js

sample-jsx-react:
	babel --presets=react --plugins ../plugin-jsdoced.js ./examples/sample-jsx-react.js

sample-eslint-jsdoc:
	eslint --rule '{valid-jsdoc:["error", {"requireReturn": false}]}' examples/sample-eslint-jsdoc.js

sample-es6-proxy:
	node --harmony_proxies examples/sample-es6-proxy.js

sample-functionreturnnested:
	babel --plugins ../plugin-jsdoced.js ./examples/sample-functionreturnnested.js

sample-es2015:
	babel --presets=es2015 -plugins ../plugin-jsdoced.js ./examples/sample-es2015.js

sample-es6-arrowfunction-implicitreturn:
	babel --plugins ../plugin-jsdoced.js ./examples/sample-es6-arrowfunction-implicitreturn.js

sample-es6-arrowfunction-explicitreturn:
	babel --plugins ../plugin-jsdoced.js ./examples/sample-es6-arrowfunction-explicitreturn.js

sample-functiondeclaration:
	babel --plugins ../plugin-jsdoced.js ./examples/sample-functiondeclaration.js

sample-functionexpression:
	babel --plugins ../plugin-jsdoced.js ./examples/sample-functionexpression.js

browser-sourcemaps:
	babel --plugins ../plugin-jsdoced.js  --source-maps=true ./examples/browser-sourcemaps.js  -o ./examples/browser-sourcemaps-build.js
	@echo Now goto http://127.0.0.1:8080/examples/browser-sourcemaps.html
