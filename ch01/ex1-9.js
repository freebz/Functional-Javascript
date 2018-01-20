function existy(x) { return x != null };


existy(null);
//=> false

existy(undefined);
//=> false

existy({}.notHere);
//=> false

existy((function(){})());
//=> false

existy(0);
//=> true

existy(false);
//=> true



function truthy(x) { return (x !== false) && existy(x) };


truthy(false);
//=> false

truthy(undefined);
//=> false

truthy(0)
//=> true

truthy('');
//=> true



{
    if(condition)
	return _.isFunction(doSomething) ? doSomething() : doSomething);
    else
	return undefined;
}



function doWhen(cond, action) {
    if(truthy(cond))
	return action();
    else
	return undefined;
}



function executeIfHasField(target, name) {
    return doWhen(existy(target[name]), function() {
	var result = _.result(target, name);
	console.log(['The result is', result].join(' '));
	return result;
    });
}



executeIfHasField([1,2,3], 'reverse');
// (콘솔) The result is 3, 2, 1
//=> [3, 2, 1]

executeIfHasField({foo: 42}, 'foo');
// (콘솔) The result is 42
//=> 42

executeIfHasField([1,2,3], 'notHere');
//=> undefined



[null, undefined, 1, 2, false].map(existy);
//=> [false, false, true, true, true]

[null, undefined, 1, 2, false].map(truthy);
//=> [false, false, true, true, false]
