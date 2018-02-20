// A.1.5 allong.es

//var iterators = require('./allong.es').iterators
var iterators = require('allong.es').allong.es.iterators
var take = iterators.take,
    map = iterators.map,
    drop = iterators.drop;

var ints = iterators.numbers();



var squares = take(drop(map(ints, function(n) {
    return n * n;
}), 100000), 100);



var coll = [];
for (var i = 0; i < 100; i++ ) {
    coll.push(squares())
}

coll;
//=> [10000200001,
//    10000400004,
//    10000600009,
//    10000800016,
//    10001000025,
//    10001200036,
//    ...
//    10020010000]
