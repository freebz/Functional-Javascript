const _ = require('underscore');


var letters = ['a', 'b', 'c'];

letters[1];
//=> 'b'



function naiveNth(a, index) {
    return a[index];
}

naiveNth(letters, 1);

naiveNth({}, 1);
//=> 어떤 결과가 발생할지 정의되어 있지 않음


function isIndexed(data) {
    return _.isArray(data) || _.isString(data);
}

function nth(a, index) {
    if (!_.isNumber(index)) fail("Expected a number as the index");
    if (!isIndexed(a)) fail("Not supported on non-indexed type");
    if ((index < 0) || (index > a.length - 1))
	fail("Index value is out of bounds");

    return a[index];
}


nth(letters, 1);
//=> 'b'

nth("abc", 0);
//=> "a"

nth({}, 2);
// Error: Not supported on non-indexed type

nth(letters, 4000);
// Error: Index value is out of bounds

nth(letters, 'aaaaa');
// Error: Expected a number as the index



function second(a) {
    return nth(a, 1);
}

second(['a','b']);
//=> "b"

second("fogus");
//=> "o"

second({});
// Error: Not supported on non-indexed type
