// 9.2.6 믹스인 믹싱을 이용한 새로운 형식

var CAS = function(val) {
    Hole.call(this, val);
}



var CASMixin = {
    swap: function(oldVal, f) {
	if (this._value === oldVal) {
	    this.setValue(f(this._value));
	    return this._value;
	}
	else {
	    return undefined;
	}
    }
};



_.extend(CAS.prototype
	 , HoleMixin
	 , ValidateMixin
	 , ObserverMixin
	 , SwapMixin
	 , CASMixin
	 , SnapshotMixin);



var c = new CAS(42);

c.swap(42, always(-1));
//=> -1

c.snapshot();
//=> -1

c.swap('not the value', always(100000));
//=> undefined


c.snapshot();
//=> -1
