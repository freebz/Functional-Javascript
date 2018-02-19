// 9.2.5 믹스인 확장을 이용해서 새 기능 추가

var SwapMixin = {
    swap: function(fun /* , args... */) {
	var args = _.rest(arguments)
	var newValue = fun.apply(this, construct(this._value, args));

	return this.setValue(newValue);
    }
};



var o = {_value: 0, setValue: _.identity};

_.extend(o, SwapMixin);

o.swap(construct, [1,2,3]);
//=> [0, 1, 2, 3]



var SnapshotMixin = {
    snapshot: function() {
	return deepClone(this._value);
    }
};



_.extend(Hole.prototype
	 , HoleMixin
	 , ValidateMixin
	 , ObserverMixin
	 , SwapMixin
	 , SnapshotMixin);



var h = new Hole(42);

h.snapshot();
//=> 42

h.swap(always(99));
//=> 99

h.snapshot();
//=> 99
