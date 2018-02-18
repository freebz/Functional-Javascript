// 7.3 변화 제어 정책

var container = contain({name: "Lemonjon"});

container.set({name: "Lemongrab"});



var being = {name: "Lemonjon"};

being.name = "Lemongrab";



var container = contain({name: "Lemonjon"});

container.update(merge, {name: "Lemongrab"});



function Container(init) {
    this._value = init;
};



var aNumber = new Container(42);

aNumber;
//=> {_value: 42}



Container.prototype = {
    update: function(fun /*, args */) {
	var args = _.rest(arguments);
	var oldValue = this._value;

	this._value = fun.apply(this, construct(oldValue, args));

	return this._value;
    }
};



var aNumber = new Container(42);

aNumber.update(function(n) { return n + 1 });
//=> 43

aNumber;
//=> {_value: 43}



aNumber.update(function(n, x, y, z) { return n / x / y / z }, 1, 2, 3);
//=> 7.166666666666667



aNumber.update(_.compose(megaCheckedSqr, always(0)));
// Error: arg must not be zero
