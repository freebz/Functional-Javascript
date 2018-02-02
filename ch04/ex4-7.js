// 4.2.1 고차원 함수로 인자 캡처하기

function makeAdder(CAPTURED) {
    return function(free) {
	return free + CAPTURED;
    };
}

var add100 = makeAdder(100);

add100(38);
//=> 138
