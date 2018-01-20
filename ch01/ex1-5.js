const _ = require('underscore');


function fail(thing) {
    throw new Error(thing);
}

function warn(thing) {
    console.log(["WARNING:", thing].join(' '));
}

function note(thing) {
    console.log(["NOTE:", thing].join(' '));
}



function parseAge(age) {
    if (!_.isString(age)) fail("Expecting a string");
    var a;

    note("Attempting to parse an age");
    a = parseInt(age, 10);

    if (_.isNaN(a)) {
	warn(["Could not parse age:", age].join(' '));
	a = 0;
    }

    return a;
}



parseAge("frob");
// (콘솔) NOTE: Attempting to parse an age
// (콘솔) WARNING: Could not parse age: frob
//=> 0



function note() {}
function warn(str) {
    alert("That doesn't look like a valid age");
}

parseAge("frob");
// (알림창) That doesn't look like a valid age
//=> 0
