// 8.1.1 게으른 체인

function LazyChain(obj) {
    this._calls = [];
    this._target = obj;
}



LazyChain.prototype.invoke = function(methodName /*, args */) {
    var args = _.rest(arguments);

    this._calls.push(function(target) {
	var meth = target[methodName];

	return meth.apply(target, args);
    });

    return this;
};



new LazyChain([2,1,3]).invoke('sort')._calls;
//=> [function (target) { ... }]



new LazyChain([2,1,3]).invoke('sort')._calls[0]();

// TypeError: Cannot read property 'sort' of undefined



new LazyChain([2,1,3]).invoke('sort')._calls[0]([2,1,3]);

//=> [1, 2, 3]



LazyChain.prototype.force = function() {
    return _.reduce(this._calls, function(target, thunk) {
	return thunk(target);
    }, this._target);
};



new LazyChain([2,1,3]).invoke('sort').force();

//=> [1, 2, 3]



new LazyChain([2,1,3])
    .invoke('concat', [8,5,7,6])
    .invoke('sort')
    .invoke('join', ' ')
    .force();

//=> "1 2 3 5 6 7 8"



LazyChain.prototype.tap = function(fun) {
    this._calls.push(function(target) {
	fun(target);
	return target;
    });

    return this;
}



new LazyChain([2,1,3])
    .invoke('sort')
    .tap(alert)
    .force();

// 알림 창 팝업
//=> "1,2,3"



var deferredSort = new LazyChain([2,1,3])
    .invoke('sort')
    .tap(alert);

deferredSort;
//=> LazyChain



// ... 약간의 시간이 흐른 뒷

deferredSort.force();

// 알림창 팝업
//=> [1, 2, 3]



function LazyChainChainChain(obj) {
    var isLC = (obj instanceof LazyChain);

    this._calls  = isLC ? cat(obj._calls, []) : [];
    this._target = isLC ? obj._target : obj;
}

LazyChainChainChain.prototype = LazyChain.prototype;



new LazyChainChainChain(deferredSort)
    .invoke('toString')
    .force();

// 알림창 팝업
//=> "1,2,3"
