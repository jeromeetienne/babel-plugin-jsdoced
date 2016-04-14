var code = `
/**
 * @param {String} myString - super string
 */
function testFunctionParam(myString){
        // ... nothing
}

/**
 * @return {String} - super string
 */
function testFunctionReturn(value){
        return value
}
`

//////////////////////////////////////////////////////////////////////////////
//              Code Separator
//////////////////////////////////////////////////////////////////////////////


var babel = require("babel-core")
var result = babel.transform(code, {
        plugins: ["./transform-jsdoced.js"]
});
// eval the result
eval(result.code)

// console.log('code', result.code)

//////////////////////////////////////////////////////////////////////////////
//              Code Separator
//////////////////////////////////////////////////////////////////////////////

describe('Function declaration: arguments type', function() {
        it('should work with a string argument', function () {
                try {
                        testFunctionParam('ddd')
                }catch(e){
                        console.assert(false)
                }
        });
        it('should fail with a number argument', function () {
                var failed = false
                try {
                        testFunctionParam(3)
                }catch(e){
                        failed = true
                }
                console.assert(failed === true)
        });
        it('should fail with a Object argument', function () {
                var failed = false
                try {
                        testFunctionParam({})
                }catch(e){
                        failed = true
                }
                console.assert(failed === true)
        });
        it('should fail with no argument', function () {
                var failed = false
                try {
                        testFunctionParam()
                }catch(e){
                        failed = true
                }
                console.assert(failed === true)
        });
});

//////////////////////////////////////////////////////////////////////////////
//              Code Separator
//////////////////////////////////////////////////////////////////////////////

describe('Function declaration: return type', function() {
        it('should work with a string return value', function () {
                try {
                        testFunctionReturn('ddd')
                }catch(e){
                        console.assert(false)
                }
        });
        it('should fail with a number return', function () {
                var failed = false
                try {
                        testFunctionReturn(3)
                }catch(e){
                        failed = true
                }
                console.assert(failed === true)
        });
        it('should fail with a Object return', function () {
                var failed = false
                try {
                        testFunctionReturn({})
                }catch(e){
                        failed = true
                }
                console.assert(failed === true)
        });
        it('should fail with no return value', function () {
                var failed = false
                try {
                        testFunctionReturn()
                }catch(e){
                        failed = true
                }
                console.assert(failed === true)
        });
});