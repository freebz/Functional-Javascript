const _ = require('underscore');


_.reject(['a', 'b', 3, 'd'], _.isNumber);
//=> [ 'a', 'b', 'd' ]



function complement(pred) {
    return function() {
	return !pred.apply(null, _.toArray(arguments));
    };
}



_.filter(['a', 'b', 3, 'd'], complement(_.isNumber));
//=> [ 'a', 'b', 'd' ]
