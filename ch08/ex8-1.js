// 8.1 체이닝

// ...
    var errors = mapcat(function(isValid) {
	return isValid(arg) ? [] : [isValid.message];
    }, validators);
// ...



function createPerson() {
    var firstName = "";
    var lastName = "";
    var age = 0;

    return {
	setFirstName: function(fn) {
	    firstName = fn;
	    return this;
	},
	setLastName: function(ln) {
	    lastName = ln;
	    return this;
	},
	setAge: function(a) {
	    age = a;
	    return this;
	},
	toString: function() {
	    return [firstName, lastName, age].join(' ');
	}
    };
}

createPerson()
    .setFirstName("Mike")
    .setLastName("Fogus")
    .setAge(108)
    .toString();

//=> "Mike Fogus 108"



_.chain(library)
    .pluck('title')
    .sort();

//=> _



_.chain(library)
    .pluck('title')
    .sort()
    .value();

//=> ["Joy of Clojure", "SICP", "SICP"]



var TITLE_KEY = 'titel';

// ... 꽤 많은 코드

_.chain(library)
    .pluck(TITLE_KEY)
    .sort()
    .value();

//=> [undefined, undefined, undefined]



_.tap([1,2,3], note);
// NOTE: 1,2,3
//=> [1, 2, 3]



_.chain(library)
    .tap(function(o) {console.log(o)})
    .pluck(TITLE_KEY)
    .sort()
    .value();

// [{ title: 'SICP' ...
//=> [undefined, undefined, undefined]

_.chain(library)
    .pluck(TITLE_KEY)
    .tap(note)
    .sort()
    .value();

// NOTE: ,,
//=> [undefined, undefined, undefined]



_.chain(library)
    .pluck('title')
    .tap(note)
    .sort();

// NOTE: SICP,SICP,Joy of Clojure
//=> _
