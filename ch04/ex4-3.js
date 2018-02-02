// 4.1.2 함수를 다른 인자로 전달하는 상황에 대한 더 깊은 고찰: repeat, repeatedly, iterateUntil

function repeat(times, VALUE) {
    return _.map(_.range(times), function() { return VALUE; });
}

repeat(4, "Major");
//=> [ 'Major', 'Major', 'Major', 'Major' ]
