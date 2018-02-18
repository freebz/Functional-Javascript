// 7.1.4 순수성

function second(a) {
    return nth(a, 1);
}



nth(['a', 'b', 'c'], 1);
//=> 'b'

nth(['a', 'b', 'c'], 1);
//=> 'b'



var a = ['a', 'b', 'c'];

nth(a, 1);
//=> 'b'

a === a;
//=> true

nth(a, 1);
//=> 'b'

_.isEqual(a, ['a', 'b', 'c']);
//=> true



nth([{a: 1}, {b: 2}], 0);
//=> {a: 1}

nth([function() { console.log('blah') }], 0);
//=> function ...



function second(a) {
    return a[1];
}



function second(a) {
    return _.first(_.rest(a));
}



function second() {
    return 'b';
}

second(['a', 'b', 'c'], 1);
//=> 'b'
