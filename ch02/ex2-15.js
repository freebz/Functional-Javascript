
const _ = require('underscore');


var zombie = {name: "Bub", film: "Day of the Dead"};

_.keys(zombie);
//=> [ 'name', 'film' ]

_.values(zombie);
//=> [ 'Bub', 'Day of the Dead' ]



_.pluck([{title: "Chthon", author: "Anthony"},
	 {title: "Grendel", author: "Gardner"},
	 {title: "After Dark"}],
	'author');

//=> [ 'Anthony', 'Gardner', undefined ]



_.pairs(zombie);
//=> [ [ 'name', 'Bub' ], [ 'film', 'Day of the Dead' ] ]



_.object(_.map(_.pairs(zombie), function(pair) {
    return [pair[0].toUpperCase(), pair[1]];
}));

//=> { NAME: 'Bub', FILM: 'Day of the Dead' }



_.invert(zombie);
//=> { Bub: 'name', 'Day of the Dead': 'film' }



_.keys(_.invert({a: 138, b: 9}));
//=> [ '9', '138' ]



_.pluck(_.map([{title: "Chthon", author: "Anthony"},
	       {title: "Grendel", author: "Gardner"},
	       {title: "After Dark"}],
	      function(obj) {
		  return _.defaults(obj, {author: "Unknown"})
	      }),
	'author');

//=> [ 'Anthony', 'Gardner', 'Unknown' ]



var person = {name: "Romy", token: "j3983ij", password: "tigress"};

var info = _.omit(person, 'token', 'password');
info;
//=> { name: 'Romy' }

var creds = _.pick(person, 'token', 'password');
creds;
//=> { token: 'j3983ij', password: 'tigress' }



var library = [{title: "SICP", isbn: "026010771", ed: 1},
	       {title: "SICP", isbn: "026210871", ed: 2},
	       {title: "Joy of Clojure", isbn: "1935182641", ed: 1}];

_.findWhere(library, {title: "SICP", ed: 2});

//=> { title: 'SICP', isbn: '026210871', ed: 2 }



_.where(library, {title: "SICP"});
//=> [ { title: 'SICP', isbn: '026010771', ed: 1 },
//     { title: 'SICP', isbn: '026210871', ed: 2 } ]
