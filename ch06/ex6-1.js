// 6.1 자신을 호출하는 함수

function myLength(ary) {
    if (_.isEmpty(ary))
	return 0;
    else
	return 1 + myLength(_.rest(ary));
}



myLength(_.range(10));
//=> 10

myLength([]);
//=> 0

myLength(_.range(1000));
//=> 1000



var a = _.range(10);

myLength(a);
//=> 10

a;
//=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]



function cycle(times, ary) {
    if (times <= 0)
	return [];
    else
	return cat(ary, cycle(times - 1, ary));
}



cycle(2, [1,2,3]);
//=> [1, 2, 3, 1, 2, 3]

_.take(cycle(20, [1,2,3]), 11);
//=> [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2]



_.zip(['a', 'b', 'c'], [1, 2, 3]);
//=> [['a', 1], ['b', 2], ['c', 3]]



var zipped1 = [['a', 1]];



function constructPair(pair, rests) {
    return [construct(_.first(pair), _.first(rests)),
	    construct(second(pair), second(rests))];
}



constructPair(['a', 1], [[],[]]);
//=> [['a'], [1]]

_.zip(['a'], [1]);
//=> [['a', 1]]

_.zip.apply(null, constructPair(['a', 1], [[],[]]));
//=> [['a', 1]]



constructPair(['a', 1],
  constructPair(['b', 2],
    constructPair(['c', 3], [[],[]])));

//=> [['a','b','c'],[1,2,3]]



function unzip(pairs) {
    if (_.isEmpty(pairs)) return [[],[]];

    return constructPair(_.first(pairs), unzip(_.rest(pairs)));
}



unzip(_.zip([1,2,3],[4,5,6]));
//=> [[1,2,3],[4,5,6]]
