var library = [{title: "SICP", isbn: "026010771", ed: 1},
	       {title: "SICP", isbn: "026210871", ed: 2},
	       {title: "Joy of Clojure", isbn: "1935182641", ed: 1}];

function note(thing) {
    console.log(["NOTE:", thing].join(' '));
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

function project(table, keys) {
    return _.map(table, function(obj) {
	return _.pick.apply(null, construct(obj, keys));
    });
};

function rename(obj, newNames) {
    return _.reduce(newNames, function(o, nu, old) {
	if (_.has(obj, old)) {
	    o[nu] = obj[old];
	    return o;
	}
	else
	    return o;
    },
    _.omit.apply(null, construct(obj, _.keys(newNames))));
};

function as(table, newNames) {
    return _.map(table, function(obj) {
	return rename(obj, newNames);
    });
};

function restrict(table, pred) {
    return _.reduce(table, function(newTable, obj) {
	if (truthy(pred(obj)))
	    return newTable;
	else
	    return _.without(newTable, obj);
    }, table);
};

function curry2(fun) {
    return function(secondArg) {
	return function(firstArg) {
	    return fun(firstArg, secondArg);
	};
    };
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

function polyToString(obj) {
    if (obj instanceof String)
	return obj;
    else if (obj instanceof Array)
	return stringifyArray(obj);

    return obj.toString();
}

function stringifyArray(ary) {
    return ["[", _.map(ary, polyToString).join(","), "]"].join('');
}
