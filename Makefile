sample-functiondeclaration:
	babel --plugins ../babel-jsdoced.js ./examples/sample-functiondeclaration.js

sample-functionexpression:
	babel --plugins ../babel-jsdoced.js ./examples/sample-functionexpression.js

test:
	babel --plugins ../babel-jsdoced.js ./examples/test-params.js | node
