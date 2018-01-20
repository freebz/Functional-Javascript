[2, 3, -6, 0, -108, 42].sort();
//=> [-108, -6, 0, 2, 3, 42]

[2, 3, -1, -6, 0, -108, 42, 10].sort();
//=> [-1, -108, -6, 0, 10, 2, 3, 42]

[2, 3, -1, -6, 0, -108, 42, 10].sort(function(x,y) {
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
});

//=> [-108, -6, -1, 0, 2, 3, 10, 42]



function compareLessThanOrEqual(x, y) {
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
}

[2, 3, -1, -6, 0, -108, 42, 10].sort(compareLessThanOrEqual);
//=> [-108, -6, -1, 0, 2, 3, 10, 42]



if (compareLessThanOrEqual(1,1))
    console.log("less or equal");

// 아무것도 출력하지 않음


if (_.contains([0, -1], compareLessThanOrEqual(1,1)))
    console.log("less or equal");

// less or equal



function lessOrEqual(x, y) {
    return x <= y;
}



[100, 1, 0, 10, -1, -2, -1].sort(lessOrEqual);
//=> [100, 10, 1, 0, -1, -1, -2]



function comparator(pred) {
    return function(x, y) {
	if (truthy(pred(x, y)))
	    return -1;
	else if (truthy(pred(y, x)))
	    return 1;
	else
	    return 0;
    };
};



[100, 1, 0, 10, -1, -2, -1].sort(comparator(lessOrEqual));
//=> [-2, -1, -1, 0, 1, 10, 100]
