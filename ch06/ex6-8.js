// 6.2.2 중첩된 배열 탐색

doSomethingWithResult(_.map(someArray, someFun));



function visit(mapFun, resultFun, array) {
    if (_.isArray(array))
	return resultFun(_.map(array, mapFun));
    else
	return resultFun(array);
}



visit(_.identity, _.isNumber, 42);
//=> true

visit(_.isNumber, _.identity, [1, 2, null, 3]);
//=> [true, true, false, true]

visit(function(n) { return n*2 }, rev, _.range(10));
//=> [18, 16, 14, 12, 10, 8, 6, 4, 2, 0]



function postDepth(fun, ary) {
    return visit(partial1(postDepth, fun), fun, ary);
}



function preDepth(fun, ary) {
    return visit(partial1(preDepth, fun), fun, fun(ary));
}



postDepth(_.identity, influences);
//=> [['Lisp','Smalltalk'], ['Lisp','Scheme'], ...



postDepth(function(x) {
    if (x === "Lisp")
	return "LISP";
    else
	return x;
}, influences);

//=> [['LISP','Smalltalk'], ['LISP','Scheme'], ...

influences;
//=> [['Lisp','Smalltalk'], ['Lisp','Scheme'], ...



function influencedWithStrategy(strategy, lang, graph) {
    var results = [];

    strategy(function(x) {
	if (_.isArray(x) && _.first(x) === lang)
	    results.push(second(x));

	return x;
    }, graph);

    return results;
}



influencedWithStrategy(postDepth, "Lisp", influences);
//=> ["Smalltalk", "Scheme"]
