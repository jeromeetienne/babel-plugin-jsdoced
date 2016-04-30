/**
 * - very experimental
 */


var jsdocParse = require('./vendor/jsdocParse.js')
var babelTraverse = require('babel-traverse')

console.dir(babelTraverse)
// return
// check https://github.com/jeromeetienne/jsdoced.js/blob/master/libs/processFile.js#L97

//////////////////////////////////////////////////////////////////////////////////
//                Comments
//////////////////////////////////////////////////////////////////////////////////

module.exports = function(babel) {
        var t = babel.types
	var contentLines;
        
        
        // to detect infinite traverse on returnStatement
        var OBJECT_JSDOCED_MARKER = Symbol();
        
        return {
                visitor: {
                        Program(path, file) {
                                // Store the content lines to parse the jsdoc
                        	contentLines   = file.file.code.split('\n')
			},
                        AssignmentExpression : function(path, state) {
                                // When processing the 'return' path, mark it so you know you've processed it.
                                if( path.node[OBJECT_JSDOCED_MARKER] ) return;
                                

                                var assignmentExpression = path.node;
                        	var leftExpression	= assignmentExpression.left
                        	var rightExpression	= assignmentExpression.right
                                // path.insertBefore(t.expressionStatement(t.stringLiteral("Because I'm easy come, easy go.")));
                                // console.error('AssignmentExpression', path.node)
                                
                                
                                // if leftExpression isnt a 'MemberExpression', return now
	                        if( leftExpression.type !== 'MemberExpression' )	return

                                // check to avoid reccursive 
                                if( leftExpression.property.name === '_jsdocedProperties' ) return
                                if( leftExpression.object.type === 'MemberExpression' && leftExpression.object.property.name === '_jsdocedProperties' ) return

                                //////////////////////////////////////////////////////////////////////////////////
                                //                Comments
                                //////////////////////////////////////////////////////////////////////////////////
                        	
                                // if there is no code location, i can't path.node.loc
                                if( path.node.loc === undefined )       return;
                                
                                var lineNumber  = path.node.loc.start.line-1
                                var jsdocJson	= jsdocParse.extractJsdocJson(contentLines, lineNumber)
                        	// if no jsdocJson, do nothing
                        	if( jsdocJson === null )	return
                                
                                console.error('jsdocJson', jsdocJson)

                                //////////////////////////////////////////////////////////////////////////////////
                                //                Comments
                                //////////////////////////////////////////////////////////////////////////////////

                                
                                var conditionString = jsdocParse.types2Conditions(jsdocJson.type, 'value')

                                var code = ''
                                code += "OBJECT._jsdocedProperties = OBJECT._jsdocedProperties || new Object;"
                                code += "OBJECT._jsdocedProperties.PROPERTYNAME = function(value){ return "+conditionString+" };"

                                var template = babel.template(code);
                                var block = template({
                                        OBJECT: leftExpression.object,
                                        PROPERTYNAME : leftExpression.property,
                                })

                                // // marker internal 
                                // babel.traverse(block, {
                                //         AssignmentExpression : function(path){ path.node[OBJECT_JSDOCED_MARKER] = true; },
                                //         ObjectExpression: function(path){ path.node[OBJECT_JSDOCED_MARKER] = true; }
                                // }, state)

                                path.insertBefore(block);


                        },
                        ObjectExpression : function(path){
                                // console.error('ObjectExpression', path.node)

                                // When processing the 'return' path, mark it so you know you've processed it.
                                if( path.node[OBJECT_JSDOCED_MARKER] ) return;

                                var code = `new Proxy(TARGET, {
                                	set: function(object, property, value) {
                                                // console.log("check property", property, "with value", value)
                                		if( object._jsdocedProperties && object._jsdocedProperties[property] ){
                                                        var checkingFunction = object._jsdocedProperties[property]
                                                        var isValid = checkingFunction(value)
                                			console.assert(isValid, 'property "'+property+ '" value is invalid')
                                		}
                                		object[property] = value;
                                	}
                                })`

                                var template = babel.template(code);
                                var block = template({
                                        TARGET : path.node
                                })


                                path.replaceWith(block)

                                // 
                                path.traverse({
                                        AssignmentExpression : function(path){
                                                path.node[OBJECT_JSDOCED_MARKER] = true;                                                
                                        },
                                        ObjectExpression: function(path){
                                                path.node[OBJECT_JSDOCED_MARKER] = true;
                                        }
                                })

                        }
                }
        }
}
