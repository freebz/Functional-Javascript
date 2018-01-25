const _ = require('underscore');


_.each;

//=> 함수 (배열, n, 가드) {
//       ...
//   }



var a = {name: "a", fun: function () { return this; }};

a.fun();
//=> {name: "a", fun ...};



var bFunc = function () { return this; };
var b = {name: "b", fun: bFunc};

b.fun();
//=> Window 같은 어떤 전역 객체
