sample-functiondeclaration:
	babel ./examples/sample-functiondeclaration.js --plugins ../babel-jsdoced.js

sample-functionexpression:
	babel ./examples/sample-functionexpression.js --plugins ../babel-jsdoced.js

test:
	babel --plugins ../babel-jsdoced.js ./examples/test-params.js | node
