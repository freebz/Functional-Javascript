const _ = require('underscore');

function existy(x) { return x != null };

function truthy(x) { return (x !== false) && existy(x) };

function doWhen(cond, action) {
    if(truthy(cond))
	return action();
    else
	return undefined;
}

function invoker (NAME, METHOD) {
    return function(target /* 인자... */) {
	if (!existy(target)) fail("Must provide a target");

	var targetMethod = target[NAME];
	var args = _.rest(arguments);

	return doWhen((existy(targetMethod) && METHOD === targetMethod), function() {
	    return targetMethod.apply(target, args);
	});
    };
};

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

function always(VALUE) {
    return function() {
	return VALUE;
    };
};

function checker(/* 검증자 */) {
    var validators = _.toArray(arguments);

    return function(obj) {
	return _.reduce(validators, function(errs, check) {
	    if (check(obj))
		return errs
	    else
		return _.chain(errs).push(check.message).value();
	}, []);
    };
}

function validator(message, fun) {
    var f = function(/* 인자 */) {
	return fun.apply(fun, arguments);
    };

    f['message'] = message;
    return f;
}

function aMap(obj) {
    return _.isObject(obj);
}

function complement(PRED) {
    return function() {
	return !PRED.apply(null, _.toArray(arguments));
    };
}

function mapcat(fun, coll) {
    return cat.apply(null, _.map(coll, fun));
}

function isEven(n) { return (n%2) === 0 }

function hasKeys() {
    var KEYS = _.toArray(arguments);

    var fun = function(obj) {
	return _.every(KEYS, function(k) {
	    return _.has(obj, k);
	});
    };

    fun.message = cat(["Must have values for keys:"], KEYS).join(" ");
    return fun;
}

function splat(fun) {
    return function(array) {
	return fun.apply(null, array);
    };
}
