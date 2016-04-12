/**
 * This is a super function
 * @param {String} myString1 - a super string
 * @param {String|Number|Function|THREE.Vector3} myString2 - a super string
 * @return {Number|String} - super returned string
 */
function myFunctionDeclaration(myString1, myString2){
        console.log('now is', new Date())
        if( true ) return 'food'
        return myString1+myString1+'---'+myString2;
}


console.log('return is ', myFunctionDeclaration('foo', 'bar'))
