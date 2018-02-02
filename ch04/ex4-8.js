// 4.2.2 변수를 캡처하는 이유

function uniqueString(len) {
    return Math.random().toString(36).substr(2, len);
};

uniqueString(10);
//=> "3rm6ww5w0x"



function uniqueString(prefix) {
    return [prefix, new Date().getTime()].join('');
};

uniqueString("argento");
//=> "argento1356107740868"



uniqueString("ghosts");
//=> "ghosts0"

uniqueString("turkey");
//=> "turkey1"



function makeUniqueStringFunction(start) {
    var COUNTER = start;

    return function(prefix) {
	return [prefix, COUNTER++].join('');
    }
};

var uniqueString = makeUniqueStringFunction(0);

uniqueString("dari");
//=> "dari0"

uniqueString("dari");
//=> "dari1"



var generator = {
    count: 0,
    uniqueString: function(prefix) {
	return [prefix, this.count++].join('');
    }
};

generator.uniqueString("bohr");
//=> "bohr0"

generator.uniqueString("bohr");
//=> "bohr1"



// count를 재할당
generator.count = "gotcha";
generator.uniqueString("bohr");
//=> "bohrNaN"

// 동적으로 바인딩
generator.uniqueString.call({count: 1337}, "bohr");
//=> "bohr1337"



var omgenerator = (function(init) {
    var COUNTER = init;

    return {
	uniqueString: function(prefix) {
	    return [prefix, COUNTER++].join('');
	}
    };
})(0);

omgenerator.uniqueString("lichking-");
//=> "lichking-0"
