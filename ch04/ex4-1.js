// 4.1 다른 함수를 인자로 취하는 함수

// 4.1.1 함수 전달에 대한 고찰: max, finder, best

const _ = require('underscore');


_.max([1, 2, 3, 4, 5]);
//=> 5

_.max([1, 2, 3, 4.75, 4.5])
//=> 4.75



var people = [{name: "Fred", age: 65}, {name: "Lucy", age: 36}];

_.max(people, function(p) { return p.age });

//=> { name: 'Fred', age: 65 }



function finder(valueFun, bestFun, coll) {
    return _.reduce(coll, function(best, current) {
	var bestValue = valueFun(best);
	var currentValue = valueFun(current);

	return (bestValue === bestFun(bestValue, currentValue)) ? best : current;
    });
}



finder(_.identity, Math.max, [1,2,3,4,5]);

//=> 5


function plucker(FIELD) {
    return function(obj) {
	return (obj && obj[FIELD]);
    };
}

finder(plucker('age'), Math.max, people);

//=> { name: 'Fred', age: 65 }

finder(plucker('name'),
       function(x,y) { return (x.charAt(0) === "L") ? x : y },
       people);

//=> { name: 'Lucy', age: 36 }
