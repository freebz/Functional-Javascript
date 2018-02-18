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

function partial1(fun, arg1) {
    return function(/* args */) {
	var args = construct(arg1, arguments);
	return fun.apply(fun, args);
    };
}

function repeatedly(times, fun) {
    return _.map(_.range(times), fun);
}

function validator(message, fun) {
    var f = function(/* 인자 */) {
	return fun.apply(fun, arguments);
    };

    f['message'] = message;
    return f;
}

var zero = validator("cannot be zero", function(n) { return 0 === n });
var number = validator("arg must be a number", _.isNumber);

function sqr(n) {
    if (!number(n)) throw new Error(number.message);
    if (zero(n)) throw new Error(zero.message);

    return n * n;
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

function curry2(fun) {
    return function(secondArg) {
	return function(firstArg) {
	    return fun(firstArg, secondArg);
	};
    };
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

function partial(fun /*, pargs */) {
    var pargs = _.rest(arguments);

    return function(/* arguments */) {
	var args = cat(pargs, _.toArray(arguments));
	return fun.apply(fun, args);
    };
}

function complement(PRED) {
    return function() {
	return !PRED.apply(null, _.toArray(arguments));
    };
}

function mapcat(fun, coll) {
    return cat.apply(null, _.map(coll, fun));
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

var greaterThan = curry2(function (lhs, rhs) { return lhs > rhs });

var sqrPre = condition1(
    validator("arg must not be zero", complement(zero)),
    validator("arg must be a number", _.isNumber));

var sqrPost = condition1(
    validator("result should be a number", _.isNumber),
    validator("result should not be zero", complement(zero)),
    validator("result should be positive", greaterThan(0)));

function uncheckedSqr(n) { return n * n };

var checkedSqr = partial1(sqrPre, uncheckedSqr);

var megaCheckedSqr = _.compose(partial(sqrPost, _.identity), checkedSqr);

function always(VALUE) {
    return function() {
	return VALUE;
    };
};
