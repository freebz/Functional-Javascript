// 5.2.2 자동 커링 파라미터

function curry(fun) {
    return function(arg) {
	return fun(arg);
    };
}



parseInt('11');
//=> 11



parseInt('11', 2);
//=> 3



['11','11','11','11'].map(parseInt)
//=> [11, NaN, 3, 4]



['11','11','11','11'].map(curry(parseInt))



function curry2(fun) {
    return function(secondArg) {
	return function(firstArg) {
	    return fun(firstArg, secondArg);
	};
    };
}



function div(n, d) { return n / d }

var div10 = curry2(div)(10);

div10(50);
//=> 5



var parsebinaryString = curry2(parseInt)(2);

parsebinaryString("111");
//=> 7

parsebinaryString("10");
//=> 2
