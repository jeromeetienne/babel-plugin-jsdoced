var code = `
// main.js
var React = require('react');

/**
 * @param {String} className - super class
 */
function testFunctionParam(className){
}

/**
 * @return {Object} - i cant get a better type out of React.createElement
 */
function testFunctionReturn(){
        return <div>
          <img src="avatar.png" className="profile" />
        </div>;
}

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
        presets: ["react"],
        plugins: ["./transform-jsdoced.js"]
});
// console.log('code', result.code)
// eval the result
var evalResult = eval(result.code)
var testFunctionParam = evalResult.testFunctionParam
var testFunctionReturn = evalResult.testFunctionReturn

//////////////////////////////////////////////////////////////////////////////
//              Code Separator
//////////////////////////////////////////////////////////////////////////////

describe('JSX Function: arguments type', function() {
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

describe('JSX Function: return type', function() {
        it('should work with a string return value', function () {
                try {
                        testFunctionReturn()
                }catch(e){
                        console.assert(false)
                }
        });
});