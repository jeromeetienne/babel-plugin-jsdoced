var jsdocParse	= require('./vendor/jsdocParse.js')

//////////////////////////////////////////////////////////////////////////////////
//                Comments
//////////////////////////////////////////////////////////////////////////////////

var pluginOptions = {
        minimalReturn : true, // true if the return should be scoped in a {} IIF necessary - TODO to remove. this is useelessly complex. only in case there is a bug in this code
        errorType : 'assert', // 'assert' to generate error as assert, 'exception' to generate error as exception
}

function updatePluginOptions(state){
        // NOTE: the api to handle babel plugin options is... weird to say the list
        if( state.opts.minimalReturn !== undefined )  pluginOptions.minimalReturn = state.opts.minimalReturn
        if( state.opts.errorType !== undefined )  pluginOptions.errorType = state.opts.errorType
}

//////////////////////////////////////////////////////////////////////////////////
//                Comments
//////////////////////////////////////////////////////////////////////////////////

function generateCheckCode(varType, varName, message){
        var conditionString = jsdocParse.types2Conditions(varType, varName);
        if( pluginOptions.errorType === 'assert' ){
                var str = "console.assert("+conditionString+", '"+message+"');"                
        }else if( pluginOptions.errorType === 'exception' ){
                var str = "if(!("+conditionString+")) throw new TypeError('"+message+"');"
        }else   console.assert(false)
        return str
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
                        FunctionDeclaration : function(path, state) {
                                updatePluginOptions(state)
                                postProcessFunction(path)
                        },
                        FunctionExpression : function(path, state) {
                                updatePluginOptions(state)
                                postProcessFunction(path)
                        },
                        ArrowFunctionExpression : function(path, state){
                                updatePluginOptions(state)

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
                                if (path.node[RETURN_MARKER] === true ) return;

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
