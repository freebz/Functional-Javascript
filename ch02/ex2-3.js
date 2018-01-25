const _ = require('underscore');


function lyricSegment(n) {
    return _.chain([])
	.push(n + " bottles of beer on the wall")
	.push(n + " bottles of beer")
	.push("Take one down, pass it around")
	.tap(function(lyrics) {
	    if (n > 1)
		lyrics.push((n - 1) + " bottles of beer on the wall.");
	    else
		lyrics.push("No more bottles of beer on the wall!");
	})
    .value();
}



lyricSegment(9);
//=> [ '9 bottles of beer on the wall',
//     '9 bottles of beer',
//     'Take one down, pass it around',
//     '8 bottles of beer on the wall.' ]



function song(start, end, lyricGen) {
    return _.reduce(_.range(start,end,-1),
	function(acc,n) {
	    return acc.concat(lyricGen(n));
	}, []);
}



song(99, 0, lyricSegment);
//=> [ '99 bottles of beer on the wall',
//     ...
//     'No more bottles of beer on the wall!' ]
