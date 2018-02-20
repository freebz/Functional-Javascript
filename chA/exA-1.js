// A.1 자바스크립트의 함수형 라이브러리

// A.1.1 함수형 자바스크립트

map(function(n) { return n * n }, [1, 2, 3, 4]);
//=> [2, 4, 9, 16]



map('n*n', [1, 2, 3, 4]);
//=> [2, 4, 9, 16]



var lessThan5 = rcurry('<', 5);

lessThan5(4);
//=> true

lessThan5(44);
//=> false
