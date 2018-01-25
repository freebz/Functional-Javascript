const _ = require('underscore');


var nums = [100,2,25];

function div(x,y) { return x/y };

_.reduce(nums, div);
//=> 2

_.reduceRight(nums, div);
//=> 0.125



function allOf(/* funs */) {
    return _.reduceRight(arguments, function(truth, f) {
	return truth && f();
    }, true);
}

function anyOf(/* funs */) {
    return _.reduceRight(arguments, function(truth, f) {
	return truth || f();
    }, false);
}



function T() { return true }
function F() { return false }

allOf();
//=> true

allOf(T, T);
//=> true

allOf(T, T, T, T, F);
//=> false

anyOf(T, T, F);
//=> true

anyOf(F, F, F, F);
//=> false

anyOf();
//=> false
