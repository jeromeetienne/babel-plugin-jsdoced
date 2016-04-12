var code = `
/**
 * @param {String} myString - super string
 */
var myFunctionExpression = function(myString){
        // ... nothing
}
`

var babel = require("babel-core")
var result = babel.transform(code, {
        plugins: ["./babel-jsdoced.js"]
});
// eval the result
eval(result.code)

// console.log('code', result.code)

describe('Function expression: arguments type', function() {
        it('should work with a string argument', function () {
                try {
                        myFunctionExpression('ddd')
                }catch(e){
                        console.assert(false)
                }
        });
        it('should fail with a number argument', function () {
                var failed = false
                try {
                        myFunctionExpression(3)
                }catch(e){
                        failed = true
                }
                console.assert(failed === true)
        });
        it('should fail with a Object argument', function () {
                var failed = false
                try {
                        myFunctionExpression({})
                }catch(e){
                        failed = true
                }
                console.assert(failed === true)
        });
        it('should fail with no argument', function () {
                var failed = false
                try {
                        myFunctionExpression()
                }catch(e){
                        failed = true
                }
                console.assert(failed === true)
        });
});