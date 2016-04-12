var code = `
/**
 * @param {String} x - super returned string
 */
var testFunctionParam = (x) => { return x+2 }

/**
 * @return {String} - super returned string
 */
var testFunctionReturn = (x) => x

// export local variables
module.exports = {
        testFunctionParam : testFunctionParam,
        testFunctionReturn: testFunctionReturn
}
`

//////////////////////////////////////////////////////////////////////////////
//              Code Separator
//////////////////////////////////////////////////////////////////////////////

var babel = require("babel-core")
var result = babel.transform(code, {
        "presets": ["es2015"],
        plugins: ["./babel-jsdoced.js"]
});
// eval the result
var evalResult = eval(result.code)
var testFunctionParam = evalResult.testFunctionParam
var testFunctionReturn = evalResult.testFunctionReturn

// console.log('code', result.code)


//////////////////////////////////////////////////////////////////////////////
//              Code Separator
//////////////////////////////////////////////////////////////////////////////

describe('Arrow Function: arguments type', function() {
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

describe('Arrow Function: return type', function() {
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