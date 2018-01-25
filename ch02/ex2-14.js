const _ = require('underscore');
function existy(x) { return x != null };


function cat() {
    var head = _.first(arguments);
    if (existy(head))
	return head.concat.apply(head, _.rest(arguments));
    else
	return [];
}

cat([1,2,3], [4,5], [6,7,8]);
//=> [ 1, 2, 3, 4, 5, 6, 7, 8 ]



function construct(head, tail) {
    return cat([head], _.toArray(tail));
}

construct(42, [1,2,3]);
//=> [ 42, 1, 2, 3 ]



function mapcat(fun, coll) {
    return cat.apply(null, _.map(coll, fun));
}



mapcat(function(e) {
    return construct(e, [","]);
}, [1,2,3]);
//=> [ 1, ',', 2, ',', 3, ',' ]



function butLast(coll) {
    return _.toArray(coll).slice(0, -1);
}

function interpose (inter, coll) {
    return butLast(mapcat(function(e) {
	return construct(e, [inter]);
    },
    coll));
}



interpose(",", [1,2,3]);
//=> [ 1, ',', 2, ',', 3 ]
