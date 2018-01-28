// 3.5.2 클로저 사용하기

function complement(PRED) {
    return function() {
	return !PRED.apply(null, _.toArray(arguments));
    };
}



function isEven(n) { return (n%2) === 0 }



var isOdd = complement(isEven);

isOdd(2);
//=> false

isOdd(413);
//=> true



function isEven(n) { return false }

isEven(10);
//=> false



isOdd(13);
//=> true

isOdd(12);
//=> false



function showObject(OBJ) {
    return function() {
	return OBJ;
    };
}

var o = {a: 42};
var showO = showObject(o);

showO();
//=> {a: 42};



o.newField = 108;
showO();
//=> {a: 42, newField: 108};



var pingpong = (function() {
    var PRIVATE = 0;

    return {
	inc: function(n) {
	    return PRIVATE += n;
	},
	dec: function(n) {
	    return PRIVATE -= n;
	}
    };
})();



pingpong.inc(10);
//=> 10

pingpong.dec(7);
//=> 3



pingpong.div = function(n) { return PRIVATE / n };

pingpong.dev(3);
// TypeError: pingpong.dev is not a function
