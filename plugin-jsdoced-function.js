var jsdocParse	= require('./vendor/jsdocParse.js')

// @TODO should i expose this as actual plugin option, settable from babel
var pluginOptions = {
        minimalReturn : true, // true if the return should be scoped in a {} IIF necessary
        errorType : 'assert', // 'assert' to generate error as assert, 'exception' to generate error as exception
}

//////////////////////////////////////////////////////////////////////////////////
//                Comments
//////////////////////////////////////////////////////////////////////////////////

function generateCheckCode(varType, varName, message){
        var conditionString = types2Conditions(varType, varName);
        if( pluginOptions.errorType === 'assert' ){
                var str = "console.assert("+conditionString+", '"+message+"');"                
        }else if( pluginOptions.errorType === 'exception' ){
                var str = "if(!("+conditionString+")) throw new TypeError('"+message+"');"
        }else   console.assert(false)
        return str

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
}


//////////////////////////////////////////////////////////////////////////////////
//                Comments
//////////////////////////////////////////////////////////////////////////////////

module.exports = function(babel) {
        var t = babel.types
	var contentLines;
        
        // to detect infinite traverse on returnStatement
        var RETURN_MARKER = Symbol();

        return {
                visitor: {
                        Program(path, file) {
                                // Store the content lines to parse the jsdoc
                        	contentLines   = file.file.code.split('\n')
			},
                        FunctionDeclaration : function(path) {
                                postProcessFunction(path)
                        },
                        FunctionExpression : function(path) {
                                postProcessFunction(path)
                        },
                        ArrowFunctionExpression : function(path){
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
                                // sanity check - 
                                console.assert(path.node.body.type === 'BlockStatement')
                                
                                // call postProcessFunction - for usual return rule
                                postProcessFunction(path)
                        },
                }
        }


        //////////////////////////////////////////////////////////////////////////////////
        //                Comments
        //////////////////////////////////////////////////////////////////////////////////
        function postProcessFunction(path){
                var nodeFunctionBody = path.node.body.body
                var functionPath = path
                //////////////////////////////////////////////////////////////////////////////////
                //                Comments
                //////////////////////////////////////////////////////////////////////////////////
        	// get jsdocJson for this node
        	// console.log('node', path.node)
                var lineNumber  = path.node.loc.start.line-1
                var jsdocJson	= jsdocParse.extractJsdocJson(contentLines, lineNumber)
        	// if no jsdocJson, do nothing
        	if( jsdocJson === null )	return
                // console.error('found jsdoc', jsdocJson)

                //////////////////////////////////////////////////////////////////////////////////
                //                handle jsdocs params
                //////////////////////////////////////////////////////////////////////////////////
                if( jsdocJson.params ){
                        var code = ''
                        Object.keys(jsdocJson.params).forEach(function(varName, index){
                                var param = jsdocJson.params[varName]
                                code += generateCheckCode(param.type, varName, 'Invalid type for argument '+index+' '+varName);
                        })
                        // code = '{' + code + '}'
                        var paramTemplate = babel.template(code);
                        var block = paramTemplate()
                        // insert the created block
                        if( block instanceof Array ){
                                while( block.length > 0 ){
                                        nodeFunctionBody.unshift(block.pop())
                                }
                        }else{
                                nodeFunctionBody.unshift(block);
                        }
                }

                //////////////////////////////////////////////////////////////////////////////////
                //                Comments
                //////////////////////////////////////////////////////////////////////////////////

                // TODO to trap the return, do a visitor to get the return at the root of the function
                var visitorReturn = {
                        ReturnStatement : function(path){
                                // console.error('ReturnStatement', path.parentPath.type)
                                // When processing the 'return' path, mark it so you know you've processed it.
                                if (path.node[RETURN_MARKER]) return;

                                // Get the parent function
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


                                // generate code in string
                                var code = ''
                                code += 'var VARNAME = (RETURN_EXPRESSION);'
                                code +=  generateCheckCode(jsdocJson.return.type, 'VARNAME', "Invalid type for return value");
                                code += 'return VARNAME;'

                                if( pluginOptions.minimalReturn === true ){
                                        // add scope in case of if( condition ) return 2;
                                        if( path.parentPath.type !== 'BlockStatement' ){
                                                code = '{' + code + '}'
                                        }                                        
                                }else{
                                        code = '{' + code + '}'
                                }

                                var returnTemplate = babel.template(code);
                
                                var block = returnTemplate({
                                        // To store the value during the assertions 
                                        VARNAME : path.scope.generateUidIdentifier("returnValue"),
                                        // To reinsert the returned value from original expression
                                        RETURN_EXPRESSION : path.node.argument,
                                });

                                // mark the return at the end as 'alreadyProcessed'
                                if( block instanceof Array ){
                                        block[block.length-1][RETURN_MARKER] = true;                                        
                                        path.replaceWithMultiple(block);                                        
                                }else{
                                        block.body[block.body.length-1][RETURN_MARKER] = true;                                
                                        path.replaceWith(block);                                        
                                }
                        },
                }
                if( jsdocJson.return ) path.traverse(visitorReturn);
        }
}
