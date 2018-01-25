const _ = require('underscore');


var nums = [1,2,3,4,5];

function doubleAll(array) {
    return _.map(array, function(n) { return n*2 });
}

doubleAll(nums);
//=> [2, 4, 6, 8, 10]

function average(array) {
    var sum = _.reduce(array, function(a, b) { return a+b });
    return sum / _.size(array);
}

average(nums);
//=> 3

/* nums에서 짝수만 선택 */
function onlyEven(array) {
    return _.filter(array, function(n) {
	return (n%2) === 0;
    });
}

onlyEven(nums);
//=> [2, 4]
