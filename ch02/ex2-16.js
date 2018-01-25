const _ = require('underscore');

function existy(x) { return x != null };
function truthy(x) { return (x !== false) && existy(x) };


var library = [{title: "SICP", isbn: "026010771", ed: 1},
	       {title: "SICP", isbn: "026210871", ed: 2},
	       {title: "Joy of Clojure", isbn: "1935182641", ed: 1}];

_.pluck(library, 'title');

//=> [ 'SICP', 'SICP', 'Joy of Clojure' ]



function project(table, keys) {
    return _.map(table, function(obj) {
	return _.pick.apply(null, construct(obj, keys));
    });
};



var editionResults = project(library, ['title', 'isbn']);

editionResults;
//=> [ { title: 'SICP', isbn: '026010771' },
//     { title: 'SICP', isbn: '026210871' },
//     { title: 'Joy of Clojure', isbn: '1935182641' } ]



var isbnResults = project(editionResults, ['isbn']);

isbnResults;
//=> [ { isbn: '026010771' }, { isbn: '026210871' }, { isbn: '1935182641' } ]



_.pluck(isbnResults, 'isbn');
//=> [ '026010771', '026210871', '1935182641' ]



function rename(obj, newNames) {
    return _.reduce(newNames, function(o, nu, old) {
	if(_.has(obj, old)) {
	    o[nu] = obj[old];
	    return o;
	}
	else
	    return o;
    },
    _.omit.apply(null, construct(obj, _.keys(newNames))));
};



rename({a: 1, b: 2}, {'a': 'AAA'});

//=> { b: 2, AAA: 1 }



function as(table, newNames) {
    return _.map(table, function(obj) {
	return rename(obj, newNames);
    });
};



as(library, {ed: 'edition'});

//=> [ { title: 'SICP', isbn: '026010771', edition: 1 },
//     { title: 'SICP', isbn: '026210871', edition: 2 },
//     { title: 'Joy of Clojure', isbn: '1935182641', edition: 1 } ]



project(as(library, {ed: 'edition'}), ['edition']);
//=> [ { edition: 1 }, { edition: 2 }, { edition: 1 } ]



function restrict(table, pred) {
    return _.reduce(table, function(newTable, obj) {
	if (truthy(pred(obj)))
	    return newTable;
	else
	    return _.without(newTable, obj);
    }, table);
};



restrict(library, function(book) {
    return book.ed > 1;
});

//=> [ { title: 'SICP', isbn: '026210871', ed: 2 } ]



restrict(
    project(
	as(library, {ed: 'edition'}),
	['title', 'isbn', 'edition']),
    function(book) {
	return book.edition > 1;
    });

//=> [ { title: 'SICP', isbn: '026210871', edition: 2 } ]



SELECT title, isbn, edition FROM (
  SELECT ed AS edition FROM library
) EDS
WHERE edition > 1;
