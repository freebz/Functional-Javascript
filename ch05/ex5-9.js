// 5.3.1 한두 개의 알려진 인자를 부분 적용

function partial1(fun, arg1) {
    return function(/* args */) {
	var args = construct(arg1, arguments);
	return fun.apply(fun, args);
    };
}



var over10Part1 = partial1(div, 10);

over10Part1(5);
//=> 2




function partial2(fun, arg1, arg2) {
    return function(/* args */) {
	var args = cat([arg1, arg2], arguments);
	return fun.apply(fun, args);
    };
}

var div10By2 = partial2(div, 10, 2)

div10By2();
//=> 5
