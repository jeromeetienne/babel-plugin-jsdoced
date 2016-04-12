/**
 * This is a super function
 * @param {String} myString1 - a super string
 * @param {String} myString2 - a super string
 * @return {String} - super returned string
 */
function myFunctionDeclaration(myString1, myString2) {
  {
    console.assert(typeof myString1 === 'string', "Invalid type for Params 0 myString1");
    console.assert(typeof myString2 === 'string', "Invalid type for Params 1 myString2");
  }
  {
    var _returnValue = 3;
    console.assert(typeof _returnValue === 'string', "Invalid type for return value");
    return _returnValue;
  }
  {
    var _returnValue2 = myString1 + myString2;

    console.assert(typeof _returnValue2 === 'string', "Invalid type for return value");
    return _returnValue2;
  }
}

console.log('return is ', myFunctionDeclaration('foo', 'bar'));

//# sourceMappingURL=browser-sourcemaps-build.js.map