// 셰도잉

var name = "Fogus";
var name = "Renamed";

name;
//=> "Renamed"



var shadowed = 0;

function argShadow(shadowed) {
    return ["Value is", shadowed].join(' ');
}



argShadow(108)
//=> "Value is 108"

argShadow();
//=> "Value is "



var shadowed = 0;

function varShadow(shadowed) {
    var shadowed = 4320000;
    return ["Value is", shadowed].join(' ');
}

varShadow(108);
//=> "Value is 4320000"



function captureShadow(SHADOWED) {
    return function(SHADOWED) {
	return SHADOWED + 1;
    };
}

var closureShadow = captureShadow(108);

closureShadow(2);
//=> 3 (109라고 생각했던 사람은 당황했을 것이다.)
