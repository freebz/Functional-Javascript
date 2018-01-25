const _ = require('underscore');


var people = [{name: "Rick", age: 30}, {name: "Jaka", age: 24}];

_.sortBy(people, function(p) { return p.age });

//=> [ { name: 'Jaka', age: 24 }, { name: 'Rick', age: 30 } ]



var albums = [{title: "Sabbath Bloody Sabbath", genre: "Metal"},
	      {title: "Scientist", genre: "Dub"},
	      {title: "Undertow", genre: "Metal"}];

_.groupBy(albums, function(a) { return a.genre });
//=> { Metal: [ { title: 'Sabbath Bloody Sabbath', genre: 'Metal' },
//              { title: 'Undertow', genre: 'Metal' } ],
//     Dub: [ { title: 'Scientist', genre: 'Dub' } ] }



_.countBy(albums, function(a) { return a.genre });
//=> { Metal: 2, Dub: 1 }
