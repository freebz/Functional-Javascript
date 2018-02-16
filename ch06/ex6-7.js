// 6.2.1 재귀를 이용한 깊은 복제

var x = [{a: [1, 2, 3], b: 42}, {c: {d: []}}];

var y = _.clone(x);

y;
//=> [{a: [ 1, 2, 3 ], b: 42}, {c: { d: []}}];

x[1]['c']['d'] = 1000000;

y;
//=> [{a: [ 1, 2, 3 ], b: 42}, {c: { d: 1000000}}];



function deepClone(obj) {
    if (!existy(obj) || !_.isObject(obj))
	return obj;

    var temp = new obj.constructor();
    for (var key in obj)
	if (obj.hasOwnProperty(key))
	    temp[key] = deepClone(obj[key]);

    return temp;
}



var x = [{a: [1, 2, 3], b: 42}, {c: {d: []}}];

var y = deepClone(x);

_.isEqual(x, y);
//=> true

y[1]['c']['d'] = 42;

_.isEqual(x, y);
//=> false
