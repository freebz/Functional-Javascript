// 5.3 부분 적용

function divPart(n) {
    return function(d) {
	return n / d;
    };
}

var over10Part = divPart(10);
over10Part(2);
//=> 5
