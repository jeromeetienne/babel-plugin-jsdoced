### script 1
- Hello everybody,
- i would like to show you one funny javascript trick.
- it is a babel plugin, and it is less than 200 lines.
- let me shortly explain the problem im trying to solve.
- First lets take a function

```javascript
function isOdd(n){
	return n % 1 ? true : false
}
```

- Lets use this function 

```javascript
isOdd(0) // => false
isOdd(1) // => true
```

- now javascript is not strong typed.
- What if we call

```javascript
isOdd('foobar') // => false
```

- We pass the wrong argument, we pass a string instead of a Number
- but javascript is telling you nothing. you

- then what if we add a classical jsdoc comment.
- and then write a babel plugin for it.
- It will use jsdoc information to detect this kind of mistake
- let me tell you more about this.

- First lets add this jsdoc comment

```javascript
/**
 * Test if it is odd
 * @param {Number} n - a number
 * @return {Boolean} true if it is odd, false otherwise
 */
function isOdd(n){
	return n % 2 ? true : false
}
```

- now we compile it using our babel plugin

```sh
$ babel --plugins transform-jsdoced isOdd.js
```
