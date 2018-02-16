// 6.1.3 재귀 함수와 합성 함수: Conjoin, Disjoin

function andify(/* preds */) {
    var preds = _.toArray(arguments);

    return function(/* args */) {
	var args = _.toArray(arguments);

	var everything = function(ps, truth) {
	    if (_.isEmpty(ps))
		return truth;
	    else
		return _.every(args, _.first(ps))
		       && everything(_.rest(ps), truth);
	};

	return everything(preds, true);
    };
}



var evenNums = andify(_.isNumber, isEven);

evenNums(1,2);
//=> false

evenNums(2,4,6,8);
//=> true

evenNums(2,4,6,8,9);
//=> false



function orify(/* preds */) {
    var preds = _.toArray(arguments);

    return function(/* args */) {
	var args = _.toArray(arguments);

	var something = function(ps, truth) {
	    if (_.isEmpty(ps))
		return truth;
	    else
		return _.some(args, _.first(ps))
		       || something(_.rest(ps), truth);
	};

	return something(preds, false);
    };
}



var zeroOrOdd = orify(isOdd, zero);

zeroOrOdd();
//=> false

zeroOrOdd(0,2,4,6);
//=> true

zeroOrOdd(2,4,6);
//=> false
