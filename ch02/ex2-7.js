const _ = require('underscore');


_.map({a: 1, b: 2}, _.identity);
//=> [ 1, 2 ]



_.map({a: 1, b: 2}, function(v,k) {
    return [k,v];
});
//=> [ [ 'a', 1 ], [ 'b', 2 ] ]



_.map({a: 1, b: 2}, function(v,k,coll) {
    return [k, v, _.keys(coll)];
});
//=> [ [ 'a', 1, [ 'a', 'b' ] ], [ 'b', 2, [ 'a', 'b' ] ] ]
