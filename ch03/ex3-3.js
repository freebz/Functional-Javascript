// 3.3 동적 스코프

var globals = {};



function makeBindFun(resolver) {
    return function(k, v) {
	var stack = globals[k] || [];
	globals[k] = resolver(stack, v);
	return globals;
    };
}



var stackBinder = makeBindFun(function(stack, v) {
    stack.push(v);
    return stack;
});

var stackUnbinder = makeBindFun(function(stack) {
    stack.pop();
    return stack;
});



var dynamicLookup = function(k) {
    var slot = globals[k] || [];
    return _.last(slot);
};



stackBinder('a', 1);
stackBinder('b', 100);

dynamicLookup('a');
//=> 1

globals;
//=> { a: [ 1 ], b: [ 100 ] }



stackBinder('a', '*');

dynamicLookup('a');
//=> '*'

globals;
//=> { a: [ 1, '*' ], b: [ 100 ] }



stackUnbinder('a');

dynamicLookup('a');
//=> 1



function f() { return dynamicLookup('a'); };
function g() { stackBinder('a', 'g'); return f(); };

f();
//=> 1

g();
//=> 'g'

globals;
{ a: [ 1, 'g' ], b: [ 100 ] }
