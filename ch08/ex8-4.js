// 8.2 파이프라이닝

pipeline([2, 3, null, 1, 42, false]
  , _.compact
  , _.initial
  , _.rest
  , rev);

//=> [1, 3]



rev(_.rest(_.initial(_.compact([2, 3, null, 1, 42, false]))));
//=> [1, 3]



function pipeline(seed /*, args */) {
    return _.reduce(_.rest(arguments),
	function(l,r) { return r(l); },
	seed);
};



pipeline();
//=> undefined

pipeline(42);
//=> 42

pipeline(42, function(n) { return -n });
//=> -42



function fifth(a) {
    return pipeline(a
	, _.rest
	, _.rest
	, _.rest
	, _.rest
	, _.first);
}



fifth([1,2,3,4,5]);
//=> 5



function negativeFifth(a) {
    return pipeline(a
	, fifth
	, function(n) { return -n });
}

negativeFifth([1,2,3,4,5,6,7,8,9]);
//=> -5



function firstEditions(table) {
    return pipeline(table
	, function(t) { return as(t, {ed: 'edition'}) }
	, function(t) { return project(t, ['title', 'edition', 'isbn']) }
	, function(t) { return restrict(t, function(book) {
	    return book.edition === 1;
	});
    });
}



firstEditions(library);

//=> [{title: "SICP", isbn: "026010771", edition: 1},
//    {title: "Joy of Clojure", isbn: "1935182641", edition: 1}]



var RQL = {
    select: curry2(project),
    as: curry2(as),
    where: curry2(restrict)
};



function allFirstEditions(table) {
    return pipeline(table
	, RQL.as({ed: 'edition'})
	, RQL.select(['title', 'edition', 'isbn'])
	, RQL.where(function(book) {
	    return book.edition === 1;
	}));
}



allFirstEditions(library);
//=> [{title: "SICP", isbn: "026010771", edition: 1},
//    {title: "Joy of Clojure", isbn: "1935182641", edition: 1}]
