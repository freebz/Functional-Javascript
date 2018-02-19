// 8.3.1 공통 모양 찾기

{values: [42, 1764, undefined, -1764]}



{values: [42, 1764, undefined, -1764],
 state: -1764}



function actions(acts, done) {
    return function (seed) {
	var init = { values: [], state: seed };

	var intermediate = _.reduce(acts, function (stateObj, action) {
	    var result = action(stateObj.state);

	    var values = cat(stateObj.values, [result.answer]);

	    return { values: values, state: result.state };
	}, init);

	var keep = _.filter(intermediate.values, existy);

	return done(keep, intermediate.state);
    };
};



function mSqr() {
    return function(state) {
	var ans = sqr(state);
	return {answer: ans, state: ans};
    }
}



var doubleSquareAction = actions(
    [mSqr(),
     mSqr()],
    function(values) {
	return values;
    });

doubleSquareAction(10);
//=> [100, 10000]



function mNote() {
    return function(state) {
	note(state);
	return {answer: undefined, state: state};
    }
}



function mNeg() {
    return function(state) {
	return {answer: -state, state: -state};
    }
}



var negativeSqrAction = actions([mSqr(), mNote(), mNeg()],
    function(_, state) {
	return state;
    });



negativeSqrAction(9);
// NOTE: 81
//=> -81
