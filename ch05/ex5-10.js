// 5.3.2 임의의 수의 인자를 부분 적용

function partial(fun /*, pargs */) {
    var pargs = _.rest(arguments);

    return function(/* arguments */) {
	var args = cat(pargs, _.toArray(arguments));
	return fun.apply(fun, args);
    };
}



var over10Partial = partial(div, 10);
over10Partial(2);
//=> 5



var div10By2By4By5000Partial = partial(div, 10, 2, 4, 5000);
div10By2By4By5000Partial();
//=> 5
