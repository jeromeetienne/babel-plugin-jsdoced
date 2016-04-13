var jsdocParse	= require('./vendor/jsdocParse.js')

//////////////////////////////////////////////////////////////////////////////////
//                Comments
//////////////////////////////////////////////////////////////////////////////////
function types2Conditions(type, varName){
        // console.error('types2Conditions', arguments)

        // handle multiple types case
        if( type.indexOf('|') !== -1 ){
                var conditions = ''
                type.split('|').forEach(function(type){
                        if( conditions.length > 0 ) conditions += ' || '
                        conditions += types2Conditions(type, varName)
                })
                return conditions
        }

        // handle single type
        if( type.toLowerCase() === 'string' ){
                return  "typeof("+varName+") === 'string'";
        }else if( type.toLowerCase() === 'number' ){
                return  "typeof("+varName+") === 'number'";
        }else if( type.toLowerCase() === 'undefined' ){
                return  "typeof("+varName+") === 'undefined'";
        }else if( type.toLowerCase() === 'function' ){
                return  varName+" instanceof Function";
        }else if( type.toLowerCase() === 'null' ){
                return  varName+" === null";
        }else{
                return varName+" instanceof "+type;
        }
}


//////////////////////////////////////////////////////////////////////////////////
//                Comments
//////////////////////////////////////////////////////////////////////////////////

module.exports = function(babel) {
        var t = babel.types
	var contentLines;
        // console.error('Loading my babel plugin')
        
        // to detect infinite traverse on returnStatement
        var RETURN_MARKER = Symbol();
        return {
                visitor: {
                        Program(path, file) {
                                // console.error('Program', file.file.code)

                                // Store the content lines to parse the jsdoc
                        	contentLines   = file.file.code.split('\n')
			},

                        FunctionDeclaration : function(path) {
                                // console.error("FunctionDeclaration HERE")
                                var nodeFunctionBody = path.node.body.body
                                
                                processFunction(path, nodeFunctionBody)
                        },

                        FunctionExpression : function(path) {
                                // console.error("FunctionExpression HERE")
                                var nodeFunctionBody = path.node.body.body

                                processFunction(path, nodeFunctionBody)
                        },

                        ArrowFunctionExpression : function(path){
                                // console.log('ArrowFunctionExpression HERE', path.node)

                                // Handle the implicit return case
                                // - modify ```() => 'foo'``` into ```() => { return 'foo' }```
                                // - then apply the usual return rules
                                if( path.node.body.type !== 'BlockStatement' ){
                                        var code = '{return EXPRESSION;}'
                                        var implicitReturnTemplate = babel.template(code);
                                        var block = implicitReturnTemplate({
                                                EXPRESSION : path.node.body
                                        })
                                        path.node.body = block;
                                }
                                
                                // detect the implicit return case
                                // LATER - convert that into BlockStatement with a return. rewrite it with a template ?
                                // => expression is the same as => { return expression }
                                // so rewrite it and then go in the normal case
                                // if( path.node.body.type !== 'BlockStatement' ) return

                                console.assert(path.node.body.type === 'BlockStatement')
                                
                                var nodeFunctionBody = path.node.body.body
                                processFunction(path, nodeFunctionBody)
                        },
                }
        }


        //////////////////////////////////////////////////////////////////////////////////
        //                Comments
        //////////////////////////////////////////////////////////////////////////////////
        function processFunction(path, nodeFunctionBody){
                var functionPath = path
                //////////////////////////////////////////////////////////////////////////////////
                //                Comments
                //////////////////////////////////////////////////////////////////////////////////
        	// get jsdocJson for this node
                var lineNumber  = path.node.loc.start.line-1
                var jsdocJson	= jsdocParse.extractJsdocJson(contentLines, lineNumber)
        	// if no jsdocJson, do nothing
        	if( jsdocJson === null )	return
                // console.error('found jsdoc', jsdocJson)

                //////////////////////////////////////////////////////////////////////////////////
                //                Comments
                //////////////////////////////////////////////////////////////////////////////////
                if( jsdocJson.params ){
                        var code = '{\n'
                        Object.keys(jsdocJson.params).forEach(function(varName, index){
                                var param = jsdocJson.params[varName]
                                var conditionString = types2Conditions(param.type, varName);
                                code += '\tconsole.assert('+conditionString+', "Invalid type for Params '+index+' '+varName+'");\n'
                        })
                        code += '}\n'
                        var paramTemplate = babel.template(code);
                        var block = paramTemplate()
                        nodeFunctionBody.unshift(block);
                }

                //////////////////////////////////////////////////////////////////////////////////
                //                Comments
                //////////////////////////////////////////////////////////////////////////////////

                // TODO to trap the return, do a visitor to get the return at the root of the function
                var visitorReturn = {
                        ReturnStatement : function(path){
                                // console.error('ReturnStatement', path.node)
                                
                                function getParentFunction(path){
                                        for(var nodePath = path.parentPath; nodePath; nodePath = nodePath.parentPath ){
                                                // console.error('node type', nodePath.node.type)
                                                var isFunction = nodePath.node.type === 'FunctionDeclaration' 
                                                        || nodePath.node.type === 'ArrowFunctionExpression'
                                                        || nodePath.node.type === 'FunctionExpression'
                                                if( isFunction )        return nodePath
                                        }
                                        return null
                                }
                                var parentFunction = getParentFunction(path)
                                if( parentFunction !== functionPath ) return;
                                // console.error('parentFunction', path)
                                
                                // When processing the 'return' path, mark it so you know you've processed it.
                                if (path.node[RETURN_MARKER]) return;
                                
                                
                                var conditionString = types2Conditions(jsdocJson.return.type, 'VARNAME');
                                var codeConditions = 'console.assert('+conditionString+', "Invalid type for return value");\n'

                                var codePrefix = `
                                        {
                                                var VARNAME = (RETURN_EXPRESSION);
                                                `
                                var codeSuffix =  `
                                                return VARNAME;
                                        }
                                `
                                var code = codePrefix + codeConditions +codeSuffix
                                var returnTemplate = babel.template(code);
                
                                var block = returnTemplate({
                                        // To store the value during the assertions 
                                        VARNAME : path.scope.generateUidIdentifier("returnValue"),
                                        // To reinsert the returned value from original expression
                                        RETURN_EXPRESSION : path.node.argument,
                                });
                                // mark the return at the end as 'alreadyProcessed'
                                block.body[block.body.length-1][RETURN_MARKER] = true;
                                
                                path.replaceWith(block);
                        },
                }
                if( jsdocJson.return ) path.traverse(visitorReturn);
        }
}
