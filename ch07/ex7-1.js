// 7.1 순수성

var rand = partial1(_.random, 1);



rand(10);
//=> 7

repeatedly(10, partial1(rand, 10));
//=> [2, 6, 6, 7, 7, 4, 4, 10, 8, 5]

_.take(repeatedly(100, partial1(rand, 10)), 5);
//=> [9, 6, 6, 4, 6]



function randString(len) {
    var ascii = repeatedly(len, partial1(rand, 26));
    return _.map(ascii, function(n) {
	return n.toString(36);
    }).join('');
}



randString(0);
//=> ""

randString(1);
//=> "f"

randString(10);
//=> "k52k7bae8p"
