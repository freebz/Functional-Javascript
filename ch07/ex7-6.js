// 7.1.5 순수성과 멱등의 관계

someFun(arg) == _.compose(someFun, someFun)(arg);



var a = [1, [10, 20, 30], 3];

var secondTwice = _.compose(second, second);

second(a) === secondTwice(a);
//=> false



var dissociativeIdentity = _.compose(_.identity, _.identity);

_.identity(42) === dissociativeIdentity(42);
//=> true



Math.abs(Math.abs(-42));
//=> 42
