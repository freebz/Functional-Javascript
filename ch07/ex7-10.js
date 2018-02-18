// 7.2.3 방어적인 얼리기와 복제

var a = [1, 2, 3];

a[1] = 42;

a;
//=> [1, 42, 3]

Object.freeze(a);

a[1] = 108;

a;
//=> [1, 42, 3]



Object.isFrozen(a);
//=> true



var x = [{a: [1, 2, 3], b: 42}, {c: {d: []}}];

Object.freeze(x);

x;
//=> [{a: [1, 2, 3], b: 42}, {c: {d: []}}];



x[1]['c']['d'] = 100000;

x;
//=> [{a: [1, 2, 3], b: 42}, {c: {d: 100000}}];



function deepFreeze(obj) {
    if (!Object.isFrozen(obj))
	Object.freeze(obj);

    for (var key in obj) {
	if (!obj.hasOwnProperty(key) || !_.isObject(obj[key]))
	    continue;

	deepFreeze(obj[key]);
    }
}



var x = [{a: [1, 2, 3], b: 42}, {c: {d: []}}];

deepFreeze(x);

x[0] = null;

x;
//=> [{a: [1, 2, 3], b: 42}, {c: {d: []}}];

x[1]['c']['d'] = 42;

x;
//=> [{a: [1, 2, 3], b: 42}, {c: {d: []}}];
