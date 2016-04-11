/**
 * This is a super function
 * @param {Number|String} a - a super string
 */
function testParam(a){
}

//////////////////////////////////////////////////////////////////////////////////
//                Comments
//////////////////////////////////////////////////////////////////////////////////
try {
        testParam(3)
}catch(e){
        console.assert(false, 'ERROR 3 is a valid parameters')
}

//////////////////////////////////////////////////////////////////////////////////
//                Comments
//////////////////////////////////////////////////////////////////////////////////

try {
        testParam('foo')
}catch(e){
        console.assert(false, 'ERROR "foo" is a valid parameters')
}

//////////////////////////////////////////////////////////////////////////////////
//                Comments
//////////////////////////////////////////////////////////////////////////////////

var receivedException = false
try {
        testParam()
}catch(e){
        receivedException = true
}
console.assert(receivedException, 'ERROR no parameter SHOULD trigger an exception')

//////////////////////////////////////////////////////////////////////////////////
//                Comments
//////////////////////////////////////////////////////////////////////////////////
var receivedException = false
try {
        testParam({})
}catch(e){
        receivedException = true
}
console.assert(receivedException, 'ERROR an {} parameter SHOULD trigger an exception')
