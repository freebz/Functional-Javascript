function validator(message, fun) {
    var f = function(/* 인자 */) {
	return fun.apply(fun, arguments);
    };

    f['message'] = message;
    return f;
}

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

function mapcat(fun, coll) {
    return cat.apply(null, _.map(coll, fun));
}

function construct(head, tail) {
    return cat([head], _.toArray(tail));
}

function partial1(fun, arg1) {
    return function(/* args */) {
	var args = construct(arg1, arguments);
	return fun.apply(fun, args);
    };
}

function condition1(/* validators */) {
    var validators = _.toArray(arguments);

    return function(fun, arg) {
	var errors = mapcat(function(isValid) {
	    return isValid(arg) ? [] : [isValid.message];
	}, validators);

	if (!_.isEmpty(errors))
	    throw new Error(errors.join(", "));

	return fun(arg);
    };
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

var str = dispatch(invoker('toString', Array.prototype.toString),
		   invoker('toString', String.prototype.toString));

function pipeline(seed /*, args */) {
    return _.reduce(_.rest(arguments),
		    function(l,r) { return r(l); },
		    seed);
};

function Container(init) {
    this._value = init;
};

function note(thing) {
    console.log(["NOTE:", thing].join(' '));
}

function fail(thing) {
    throw new Error(thing);
}

function always(VALUE) {
    return function() {
	return VALUE;
    };
};

function isEven(n) { return (n%2) === 0 }

function deepClone(obj) {
    if (!existy(obj) || !_.isObject(obj))
	return obj;

    var temp = new obj.constructor();
    for (var key in obj)
	if (obj.hasOwnProperty(key))
	    temp[key] = deepClone(obj[key]);

    return temp;
}

var zero = validator("cannot be zero", function(n) { return 0 === n });
var number = validator("arg must be a number", _.isNumber);

function sqr(n) {
    if (!number(n)) throw new Error(number.message);
    if (zero(n)) throw new Error(zero.message);

    return n * n;
}

function complement(PRED) {
    return function() {
	return !PRED.apply(null, _.toArray(arguments));
    };
}

var isOdd = complement(isEven);
