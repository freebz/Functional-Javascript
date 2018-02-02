// 4.2 다른 함수를 반환하는 함수

repeatedly(3, function() { return "Odelay!"; });

//=> [ 'Odelay!', 'Odelay!', 'Odelay!' ]



function always(VALUE) {
    return function() {
	return VALUE;
    };
};



var f = always(function(){});

f() === f();
//=> true



var g = always(function(){});

f() === g();
//=> false



repeatedly(3, always("Odelay!"));

//=> [ 'Odelay!', 'Odelay!', 'Odelay!' ]



function existy(x) { return x != null };

function truthy(x) { return (x !== false) && existy(x); };

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



var rev = invoker('reverse', Array.prototype.reverse);

_.map([[1,2,3]], rev);
//=> [[3,2,1]]
