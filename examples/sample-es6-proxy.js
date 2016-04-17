var data = {
	foo : 'bar'
}

var target = {};
var p = Proxy.create(target, {
	
});

console.log(data.foo)
