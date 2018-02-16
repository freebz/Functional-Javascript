// 6.3 너무 깊은 재귀!

evenSteven(100000);
// Too much recursion (또는 비슷한 에러)



function evenOline(n) {
    if (n === 0)
	return true;
    else
	return partial1(oddOline, Math.abs(n) - 1);
}

function oddOline(n) {
    if (n === 0)
	return false;
    else
	return partial1(evenOline, Math.abs(n) - 1);
}



evenOline(0);
//=> true

oddOline(0);
//=> false



oddOline(3);
//=> function () { return evenOline(Math.abs(n) - 1) }

oddOline(3)();
//=> function () { return oddOline(Math.abs(n) - 1) }

oddOline(3)()();
//=> function () { return evenOline(Math.abs(n) - 1) }

oddOline(3)()()();
//=> true

oddOline(200000001)()(); //... a bunch more ()s
//=> true



function trampoline(fun /*, args */) {
    var result = fun.apply(fun, _.rest(arguments));

    while (_.isFunction(result)) {
	result = result();
    }

    return result;
}



trampoline(oddOline, 3);
//=> true

trampoline(evenOline, 200000);
//=> true

trampoline(oddOline, 300000);
//=> false

trampoline(evenOline, 200000000);
// 몇 초 후
//=> true



function isEvenSafe(n) {
    if (n === 0)
	return true;
    else
	return trampoline(partial1(oddOline, Math.abs(n) - 1));
}

function isOddSafe(n) {
    if (n === 0)
	return false;
    else
	return trampoline(partial1(evenOline, Math.abs(n) - 1));
}



isOddSafe(2000001);
//=> true

isEvenSafe(2000001);
//=> false
