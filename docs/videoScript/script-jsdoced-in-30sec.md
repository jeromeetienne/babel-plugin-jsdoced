# jsdoced javascript in 30sec
- better in a gif
- similar in spirit as isOdd-image.js
- all a terminal cast, all is done in real time and i talk in the comment

# Process
- first movie recorded with quicktime
- edited or not ? YES with imovie
- no sound

# Scripts Demo - synopsys
- show the isOdd function
- add a jsdoc
- then use the function in plain javascript
- then compile in jsdoced javascript
- then use it in jsdoced javascript

# Script Demo - details
- atom: "// Let's write a function"
- atom: "// It will test if an number is odd or even"
- atom: Here write the function
```
function isOdd(n){
	if( n % 2 ){
		console.log(n, 'is odd')
	}else{
		console.log(n, 'is even')
	}
}
```
- atom: go back up, remove the 2 old comment lines
- atom: "// Now let's add JSDoc to it"
- atom: Here write the JSDoc
```
/**
 * test if a number is odd or even
 * @param {Number} n - value to test
 */
```
- atom: go back up, remove the comment line
- atom: go down 
```
// Let's check this function with valid arguments
isOdd(0)
isOdd(1)
// Now let's check an invalid argument with a string.
isOdd('foo')
```

- term: '# Now lets run this program'
- term: type the following, dont forget to highlight results, when commenting them
```
$ node isOdd.js
0 'is even'
1 'is odd'
foo is even
$ # 0 is even, all good
$
$ # 1 is odd, still all good
$
$ # foo is even !?!?!
$ # plain javascript doesn't detect the error
```

- term: clear screen via ctrl-l

```
$ # Now let's use babel to compile isOdd.js in jsdoced javascript
$ # We compile isOdd.js with babel
$ babel --plugins transform-jsdoced isOdd.js -o isOdd-jsdoced.js
```

```
$ node isOdd-jsdoced.js
0 'is even'
1 'is odd'

assert.js:89
  throw new assert.AssertionError({
  ^
AssertionError: Invalid type for Params 0 n
    at Console.assert (console.js:93:23)
    at isOdd (/Users/jerome/webwork/babel-plugin-transform-jsdoced/docs/tmp/isOdd-jsdoced.js:7:11)
    at Object.<anonymous> (/Users/jerome/webwork/babel-plugin-transform-jsdoced/docs/tmp/isOdd-jsdoced.js:24:1)
    at Module._compile (module.js:409:26)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)
    at startup (node.js:139:18)
    at node.js:968:3
```

```
$ # 
