// 4.2.3 값이 존재하지 않는 상황을 지켜 주는 함수: fnull

var nums = [1,2,3,null,5];

_.reduce(nums, function(total, n) { return total * n });
//=> 0



function doSomething(config) {
    var lookup = defaults({critical: 108});

    return lookup(config, 'critical');
}

doSomething({whoCares: 42, critical: null});
// 대참사



function fnull(fun /*, 기본값 */) {
    var defaults = _.rest(arguments);

    return function(/* 인자 */) {
	var args = _.map(arguments, function(e, i) {
	    return existy(e) ? e : defaults[i];
	});

	return fun.apply(null, args);
    };
};



var safeMult = fnull(function(total, n) { return total * n }, 1, 1);

_.reduce(nums, safeMult);
//=> 30



function defaults(d) {
    return function(o, k) {
	var val = fnull(_.identity, d[k]);
	return o && val(o[k]);
    };
}

function doSomething(config) {
    var lookup = defaults({critical: 108});

    return lookup(config, 'critical');
}

doSomething({critical: 9});
//=> 9

doSomething({});
//=> 108
