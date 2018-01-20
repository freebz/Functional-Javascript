for (var i=0, len=array.length; i < len; i++) {
    doSomething(array[i]);
}



_.each(array, function(elem) {
    doSomething(array[i]);
});



_.each = function(obj, iterator, context) {
    // 경계 검사
    // 네이티브 메서드 검사
    // 길이 프로퍼티 검사
    for (var i = 0, l = obj.length; i < l; i++) {
	// 주어진 함수 호출
    }
}



function performTask(array) {
    _.each(array, function(elem) {
	doSomething(elem);
    });
}

// ... 얼마 후

performTask([1,2,3,4,5]);



function performTask(array) {
    for (var i = 0, l = array.length; i < l; i++) {
	doSomething(array[i]);
    }
}



// ... 얼마 후

var array123 = [1,2,3,4,5];

for (var i = 0; l = array123.length; i < l; i++) {
    doSomething(array[i]);
}



// ... 얼마 후

doSomething(array[1]);
doSomething(array[2]);
doSomething(array[3]);
doSomething(array[4]);
doSomething(array[5]);



// ... 얼마 후
