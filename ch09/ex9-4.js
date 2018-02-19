// 9.2.1 코어 프로토타입 개조

(new Container(42)).toString();
//=> "[object Object]"



Container.prototype.toString = function() {
    return ["@<", polyToString(this._value), ">"].join('');
}



(new Container(42)).toString();
//=> "@<42>"

(new Container({a: 42, b: [1,2,3]})).toString();
//=> "@<{"a":42,"b":[1,2,3]}>"



Array.prototype.toString = function() {
    return "DON'T DO THIS";
}

[1,2,3].toString();
//=> "DON'T DO THIS"
