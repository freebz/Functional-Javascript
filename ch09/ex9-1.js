// 9.1 데이터 지향

function lazyChain(obj) {
    var calls = [];

    return {
	invoke: function(methodName /* args */) {
	    var args = _.rest(arguments);
	    calls.push(function(target) {
		var meth = target[methodName];

		return meth.apply(target, args);
	    });
	    return this;
	},
	force: function() {
	    return _.reduce(calls, function(ret, thunk) {
		return thunk(ret);
	    }, obj);
	}
    };
}



var lazyOp = lazyChain([2,1,3])
    .invoke('concat', [7,7,8,9,0])
    .invoke('sort');

lazyOp.force();
//=> [0, 1, 2, 3, 7, 7, 8, 9]
