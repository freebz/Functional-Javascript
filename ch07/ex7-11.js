// 7.2.4 함수 수준에서 불변성 유지하기

var freq = curry2(_.countBy)(_.identity);



var a = repeatedly(1000, partial1(rand, 3));
var copy = _.clone(a);

freq(a);
//=> {1: 498, 2: 502}



_.isEqual(a, copy);
//=> true



freq(skipTake(2, a));
//=> {1: 236, 2: 264}

_.isEqual(a, copy);
//=> true



var person = {fname: "Simon"};

_.extend(person, {lname: "Petrikov"}, {age: 28}, {age: 108});
//=> {age: 108, fname: "Simon", lname: "Petrikov"}



person;
//=> {age: 108, fname: "Simon", lname: "Petrikov"}



function merge(/* args */) {
    return _.extend.apply(null, construct({}, arguments));
}



var person = {fname: "Simon"};

merge(person, {lname: "Petrikov"}, {age: 28}, {age: 108})
//=> {age: 108, fname: "Simon", lname: "Petrikov"}

person;
//=> {fname: "Simon"};
