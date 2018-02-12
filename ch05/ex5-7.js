// 5.2.3 커링을 이용한 플루언트 API

var greaterThan = curry2(function (lhs, rhs) { return lhs > rhs });
var lessThan    = curry2(function (lhs, rhs) { return lhs < rhs });



var withinRange = checker(
    validator("arg must be greater than 10", greaterThan(10)),
    validator("arg must be less than 20", lessThan(20)));



withinRange(15);
//=> []

withinRange(1);
//=> ["arg must be greater than 10"]

withinRange(100);
//=> ["arg must be less than 20"]
