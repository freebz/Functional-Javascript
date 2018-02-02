// 최적화

// finder 함수
return (bestValue === bestFun(bestValue, currentValue)) ? best : current);

// 최적의 값 함수
return (x.charAt(0) === "L") ? x : y;



function best(fun, coll) {
    return _.reduce(coll, function(x, y) {
	return fun(x, y) ? x : y
    });
}

best(function(x,y) { return x > y }, [1,2,3,4,5]);
//=> 5
