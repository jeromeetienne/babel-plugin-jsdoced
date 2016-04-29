var jsdocParse	= require('./vendor/jsdocParse.js')


//////////////////////////////////////////////////////////////////////////////////
//                Comments
//////////////////////////////////////////////////////////////////////////////////

module.exports = function(babel) {
        var t = babel.types
	var contentLines;
        
        return {
                visitor: {
                        Program(path, file) {
                                // Store the content lines to parse the jsdoc
                        	contentLines   = file.file.code.split('\n')
			},
                        AssignmentExpression : function(path) {
                                console.log('AssignmentExpression', path)
                        },
                }
        }
}
