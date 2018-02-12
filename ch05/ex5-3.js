// 5.2.1 우향 커리, 좌향 커리

function leftCurryDiv(n) {
    return function(d) {
	return n/d;
    };
}

function rightCurryDiv(d) {
    return function(n) {
	return n/d;
    };
}



var divide10By = leftCurryDiv(10);



divide10By(2);
//=> 5



var divideBy10 = rightCurryDiv(10);



divideBy10(2);
/=> 0.2
