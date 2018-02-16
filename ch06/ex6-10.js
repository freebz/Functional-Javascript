// 6.3.1 발생기

_.take(cycle(20, [1,2,3]), 11);
//=> [1, 2, 3, 1, 2, 3, 1, 2, , 1, 2]



function generator(seed, current, step) {
    return {
	head: current(seed),
	tail: function() {
	    console.log("forced");
	    return generator(step(seed), current, step);
	}
    };
}



function genHead(gen) { return gen.head }
function genTail(gen) { return gen.tail() }



var ints = generator(0, _.identity, function(n) { return n+1 });



genHead(ints);
//=> 0

genTail(ints);
// (콘솔) forced
//=> {head: 1, tail: function}



genTail(genTail(ints));
// (콘솔) forced
// (콘솔) forced
//=> {head: 2, tail: function}



function genTake(n, gen) {
    var doTake = function(x, g, ret) {
	if (x === 0)
	    return ret;
	else
	    return partial(doTake, x-1, genTail(g), cat(ret, genHead(g)));
    };

    return trampoline(doTake, n, gen, []);
}



genTake(10, ints);
// (콘솔) forced x 10
//=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

genTake(100, ints);
// (콘솔) forced x 100
//=> [0, 1, 2, 3, 4, 5, 6, ..., 98, 99]

genTake(1000, ints);
// (콘솔) forced x 1000
//=> Array[1000]

genTake(10000, ints);
// (콘솔) forced x 10000
// 몇 초 후에
//=> Array[10000]

genTake(100000, ints);
// (콘솔) forced x 100000
// 몇 분 후에
//=> Array[100000]

genTake(1000000, ints);
// (콘솔) forced x 1000000
// 몇 시간 후에
//=> Array[1000000]



genTake(10, ints);
// (콘솔) forced x 10
//=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
