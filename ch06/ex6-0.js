function existy(x) { return x != null };

function truthy(x) { return (x !== false) && existy(x) };

function doWhen(cond, action) {
    if(truthy(cond))
	return action();
    else
	return undefined;
}

function cat() {
    var head = _.first(arguments);
    if (existy(head))
	return head.concat.apply(head, _.rest(arguments));
    else
	return [];
}

function construct(head, tail) {
    return cat([head], _.toArray(tail));
}

function fail(thing) {
    throw new Error(thing);
}

function isIndexed(data) {
    return _.isArray(data) || _.isString(data);
}

function nth(a, index) {
    if (!_.isNumber(index)) fail("Expected a number as the index");
    if (!isIndexed(a)) fail("Not supported on non-indexed type");
    if ((index < 0) || (index > a.length - 1))
	fail("Index value is out of bounds");

    return a[index];
}

function second(a) {
    return nth(a, 1);
}

function invoker(NAME, METHOD) {
    return function(target /* 인자... */) {
	if (!existy(target)) fail ("Must provide a target");

	var targetMethod = target[NAME];
	var args = _.rest(arguments);

	return doWhen((existy(targetMethod) && METHOD === targetMethod), function() {
	    return targetMethod.apply(target, args);
	});
    };
};

function dispatch(/* funs */) {
    var funs = _.toArray(arguments);
    var size = funs.length;

    return function(target /*, args */) {
	var ret = undefined;
	var args = _.rest(arguments);
	for (var funIndex = 0; funIndex < size; funIndex++) {
	    var fun = funs[funIndex];
	    ret = fun.apply(fun, construct(target, args));

	    if (existy(ret)) return ret;
	}

	return ret;
    };
}
	    
function stringReverse(s) {
    if (!_.isString(s)) return undefined;
    return s.split('').reverse().join("");
}

var rev = dispatch(invoker('reverse', Array.prototype.reverse), stringReverse);

function complement(PRED) {
    return function() {
	return !PRED.apply(null, _.toArray(arguments));
    };
}

function isEven(n) { return (n%2) === 0 }

var isOdd = complement(isEven);

function validator(message, fun) {
    var f = function(/* 인자 */) {
	return fun.apply(fun, arguments);
    };

    f['message'] = message;
    return f;
}

var zero = validator("cannot be zero", function(n) { return 0 === n });

function partial1(fun, arg1) {
    return function(/* args */) {
	var args = construct(arg1, arguments);
	return fun.apply(fun, args);
    };
}

function partial(fun /*, pargs */) {
    var pargs = _.rest(arguments);

    return function(/* arguments */) {
	var args = cat(pargs, _.toArray(arguments));
	return fun.apply(fun, args);
    };
}

function curry2(fun) {
    return function(secondArg) {
	return function(firstArg) {
	    return fun(firstArg, secondArg);
	};
    };
}
