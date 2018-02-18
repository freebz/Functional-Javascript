// 7.2.2 불변성과 재귀의 관계

function summ(array) {
    var result = 0;
    var sz = array.length;

    for (var i = 0; i < sz; i++)
	result += array[i];

    return result;
}

summ(_.range(1,11));
//=> 55



function summRec(array, seed) {
    if (_.isEmpty(array))
	return seed;
    else
	return summRec(_.rest(array), _.first(array) + seed);
}

summRec([], 0);
//=> 0

summRec(_.range(1,11), 0);
//=> 55
