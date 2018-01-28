// 자유 변수

function makeAdder(CAPTURED) {
    return function(free) {
	return free + CAPTURED;
    };
}

var add10 = makeAdder(10);

add10(32);
//=> 42



var add1024 = makeAdder(1024);
add1024(11);
//=> 1035

add10(98);
//=> 108



function average(array) {
    var sum = _.reduce(array, function(a, b) { return a+b });
    return sum / _.size(array);
}

function averageDamp(FUN) {
    return function(n) {
	return average([n, FUN(n)]);
    }
}

var averageSq = averageDamp(function(n) { return n * n });
averageSq(10);
//=> 55
