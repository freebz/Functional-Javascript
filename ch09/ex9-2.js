// 9.1.1 함수를 이용하는 프로그래밍

function deferredSort(ary) {
    return lazyChain(ary).invoke('sort');
}



var deferredSorts = _.map([[2,1,3], [7,7,1], [0,9,5]], deferredSort);
//=> [<thunk>, <thunk>, <thunk>]



function force(thunk) {
    return thunk.force();
}



_.map(deferredSorts, force);
//=> [[1, 2, 3], [1, 7, 7], [0, 5, 9]]



var validateTriples = validator(
    "Each array should have three elements",
    function (arrays) {
	return _.every(arrays, function(a) {
	    return a.length === 3;
	});
    });

var validateTripleStore = partial1(condition1(validateTriples), _.identity);



validateTripleStore([[2,1,3], [7,7,1], [0,9,5]]);
//=> [[2,1,3], [7,7,1], [0,9,5]]

validateTripleStore([[2,1,3], [7,7,1], [0,9,5,7,7,7,7,7,7]]);
// Error: Each array should have three elements



function postProcess(arrays) {
    return _.map(arrays, second);
}



function processTriples(data) {
    return pipeline(data
		    , JSON.parse
		    , validateTripleStore
		    , deferredSort
		    , force
		    , postProcess
		    , invoker('sort', Array.prototype.sort)
		    , str);
}



processTriples("[[2,1,3], [7,7,1], [0,9,5]]");
// "1,7,9"



processTriples("[[2,1,3], [7,7,1], [0,9,5,7,7,7,7,7,7]]");
// Error: Each array should have three elements



$.get("http://djhkjhkdj.com", function(data) {
    $('#result').text(processTriples(data));
});



var reportDataPackets = _.compose(
    function(s) { $('#result').text(s) },
    processTriples);



reportDataPackets("[[2,1,3], [7,7,1], [0,9,5]]");
// a page element changes



$.get("http://djhkjhkdj.com", reportDataPackets);
