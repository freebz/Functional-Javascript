// 7.2.6 객체는 대체로 저수준 동작이다

var q = SaferQueue([1,2,3]);

q.enqueue(32);
// TypeError: Cannot read property 'enqueue' of undefined



function queue() {
    return new SaferQueue(_.toArray(arguments));
}



var q = queue(1,2,3);



var enqueue = invoker('enqueue', SaferQueue.prototype.enqueue);

enqueue(q, 42);
//=> {_q: [1, 2, 3, 42]}
