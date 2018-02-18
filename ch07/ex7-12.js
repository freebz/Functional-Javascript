// 7.2.5 객체의 불변성 관찰

function Point(x, y) {
    this._x = x;
    this._y = y;
}



Point.prototype = {
    withX: function(val) {
	return new Point(val, this._y);
    },
    withY: function(val) {
	return new Point(this._x, val);
    }
};



var p = new Point(0, 1);

p.withX(1000);
//=> {_x: 1000, _y: 1}



p;
//=> {_x: 1, _y: 1}



(new Point(0, 1))
    .withX(100)
    .withY(-100);

//=> {_x: 100, _y: -100}



function Queue(elems) {
    this._q = elems;
}

Queue.prototype = {
    enqueue: function(thing) {
	return new Queue(cat(this._q, [thing]));
    }
};



var seed = [1, 2, 3];

var q = new Queue(seed);

q;
//=> {_q: [1, 2, 3]}



var q2 = q.enqueue(108);
//=> {_q: [1, 2, 3, 108]}



q;
//=> {_q: [1, 2, 3]}



seed.push(10000);

q;
//=> {_q: [1, 2, 3, 10000]}



var SaferQueue = function(elems) {
    this._q = _.clone(elems);
}



SaferQueue.prototype = {
    enqueue: function(thing) {
	return new SaferQueue(cat(this._q, [thing]));
    }
};



var seed = [1,2,3];
var q = new SaferQueue(seed);

var q2 = q.enqueue(36);
//=> {_q: [1, 2, 3, 36]}

seed.push(1000);

q;
//=> {_q: [1, 2, 3]}



q._q.push(-1111);

q;
//=> {_q: [1, 2, 3, -1111]}



SaferQueue.prototype.enqueue = sqr;

q2.enqueue(42);
//=> 1764
