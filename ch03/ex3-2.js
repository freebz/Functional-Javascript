// 3.2 어휘 스코프

aVariable = "Outer";

function afun() {
    var aVariable = "Middle";

    return _.map([1,2,3], function(e) {
	var aVariable = "In";

	return [aVariable, e].join(' ');
    });
}

afun();
//=> [ 'In 1', 'In 2', 'In 3' ]
