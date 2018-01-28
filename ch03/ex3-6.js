// 3.5 클로저

// 3.5.1 클로저 시뮬레이션

function whatWasTheLocal() {
    var CAPTURED = "Oh hai";

    return function() {
	return "The local was: " + CAPTURED;
    };
}



var reportLocal = whatWasTheLocal();



reportLocal();
//=> 'The local was: Oh hai'



function createScaleFunction(FACTOR) {
    return function(v) {
	return _.map(v, function(n) {
	    return (n * FACTOR);
	});
    };
}

var scale10 = createScaleFunction(10);

scale10([1,2,3]);
//=> [10, 20, 30]



function createWeirdScaleFunction(FACTOR) {
    return function(v) {
	this['FACTOR'] = FACTOR;
	var captures = this;

	return _.map(v, _.bind(function(n) {
	    return (n * this['FACTOR']);
	}, captures));
    };
}

var scale10 = createWeirdScaleFunction(10);

scale10.call({}, [5,6,7]);
//=> [50, 60, 70]
