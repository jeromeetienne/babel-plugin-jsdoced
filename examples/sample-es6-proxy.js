var Proxy = require('harmony-proxy');

var validator = {
	set: function(object, property, value) {
		if (property === 'age') {
			if ( Number.isInteger(value) === false ) {
				throw new TypeError('The age is not an integer');
			}
			if (value > 200) {
				throw new RangeError('The age seems invalid');
			}
		}
		
		// The default behavior to store the value
		object[property] = value;
	}
};


var MyClass = function(){
	
}

var myClassInstance = new MyClass()

var person = new Proxy(myClassInstance, validator);

console.log('bla', person instanceof MyClass)

person.age = 100;
console.log(person.age); // 100
person.age = 'young'; // Throws an exception
// person.age = 300; // Throws an exception
