// 꼬리 재귀

function tcLength(ary, n) {
    var l = n ? n : 0;

    if (_.isEmpty(ary))
	return l;
    else
	return tcLength(_.rest(ary), l + 1);
}

tcLength(_.range(10));
//=> 10
