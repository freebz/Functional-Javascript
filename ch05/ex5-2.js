// 5.2 커링

function rightAwayInvoker() {
    var args = _.toArray(arguments);
    var method = args.shift();
    var target = args.shift();

    return method.apply(target, args);
}

rightAwayInvoker(Array.prototype.reverse, [1,2,3])
//=> [3, 2, 1]



invoker('reverse', Array.prototype.reverse)([1,2,3]);
//=> [3, 2, 1]
