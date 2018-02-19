// 9.2.7 메서드는 저수준 동작이다

function contain(value) {
    return new Container(value);
}



contain(42);
//=> {_value: 42} (of type Container, but who cares?)



function hole(val /*, validator */) {
    var h = new Hole();
    var v = _.toArray(arguments)[1];

    if (v) h.addValidator(v);

    h.setValue(val);

    return h;
}



var x = hole(42, always(false));
// Error: Attempted to set invalid value 42



var swap = invoker('swap', Hole.prototype.swap);



var x = hole(42);

swap(x, sqr);
//=> 1764



function cas(val /*, args */) {
    var h = hole.apply(this, arguments);
    var c = new CAS(val);
    c._validator = h._validator;

    return c;
}

var compareAndSwap = invoker('swap', CAS.prototype.swap);



function snapshot(o) { return o.snapshot() }
function addWatcher(o, fun) { o.watch(fun) }



var x = hole(42);

addWatcher(x, note);

swap(x, sqr);
// NOTE: 42
//=> 1764

var y = cas(9, isOdd);

compareAndSwap(y, 9, always(1));
//=> 1

snapshot(y);
//=> 1
