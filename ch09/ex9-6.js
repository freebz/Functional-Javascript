// 9.2.3 계층 구조 바꾸기

// 9.2.4 믹스인으로 계층 구조를 수평화하기

function Container(val) {
    this._value = val;
    this.init(val);
}

Container.prototype.init = _.identity;



var c = new Container(42);

c;
//=> {_value: 42}



var HoleMixin = {
    setValue: function(newValue) {
	var oldVal = this._value;

	this.validate(newValue);
	this._value = newValue;
	this.notify(oldVal, newValue);
	return this._value;
    }
};



var Hole = function(val) {
    Container.call(this, val);
}



var h = new Hole(42);
// TypeError: Object [object Object] has no method 'init'



var ObserverMixin = (function() {
    var _watchers = [];

    return {
	watch: function(fun) {
	    _watchers.push(fun);
	    return _.size(_watchers);
	},
	notify: function(oldVal, newVal) {
	    _.each(_watchers, function(watcher) {
		watcher.call(this, oldVal, newVal);
	    });

	    return _.size(_watchers);
	}
    };
}());



var ValidateMixin = {
    addValidator: function(fun) {
	this._validator = fun;
    },
    init: function(val) {
	this.validate(val);
    },
    validate: function(val) {
	if (existy(this._validator) &&
	    !this._validator(val))
	    fail("Attempted to set invalid value " + polyToString(val));
    }
};



_.extend(Hole.prototype
	 , HoleMixin
	 , ValidateMixin
	 , ObserverMixin);



var h = new Hole(42);



h.addValidator(always(false));

h.setValue(9);
// Error: Attempted to set invalid value 9



var h = new Hole(42);

h.addValidator(isEven);

h.setValue(9);
// Error: Attempted to set invalid value 9

h.setValue(108);
//=> 108

h;
//=> {_validator: function isEven(n) {...},
//    _value: 108}



h.watch(function(old, nu) {
    note(["Changing", old, "to", nu].join(' '));
});
//=> 1

h.setValue(42);
// NOTE: Changing 108 to 42
//=> 42



h.watch(function(old, nu) {
    note(["Veranderende", old, "tot", nu].join(' '));
});
//=> 2

h.setValue(36);
// NOTE: Changing 42 to 36
// NOTE: Veranderende 42 tot 36
//=> 36
