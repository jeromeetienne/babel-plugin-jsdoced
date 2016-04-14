/**
 * This is a super function
 * @param {String} myString1 - a super string
 * @param {Number} myString2 - a super string
 * @return {Number} - super returned string
 */
function myFunctionDeclaration(myString1, myString2){
        console.log('now is', new Date())
        return myString1+myString1+'---'+myString2;
}


console.log('return is ', myFunctionDeclaration('foo', 'bar'))
