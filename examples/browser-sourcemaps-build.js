/**
 * This is a super function
 * @param {String} myString1 - a super string
 * @param {String|Number|Function|THREE.Vector3} myString2 - a super string
 * @return {Number|String} - super returned string
 */
function myFunctionDeclaration(myString1, myString2) {
  {
    console.assert(typeof myString1 === 'string', "Invalid type for Params 0 myString1");
    console.assert(typeof myString2 === 'string' || typeof myString2 === 'number' || myString2 instanceof Function || myString2 instanceof THREE.Vector3, "Invalid type for Params 1 myString2");
  }

  console.log('now is', new Date());
  {
    var _returnValue = myString1 + myString1 + '---' + myString2;

    console.assert(typeof _returnValue === 'number' || typeof _returnValue === 'string', "Invalid type for return value");
    return _returnValue;
  }
}

console.log('return is ', myFunctionDeclaration('foo', 'bar'));

//# sourceMappingURL=browser-sourcemaps-build.js.map