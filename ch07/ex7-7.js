// 7.2 불변성

var s = "Lemongrab";

s.toUpperCase();
//=> "LEMONGRAB"

s;
//=> "Lemongrab"



var key = "lemongrab";
var obj = {lemongrab: "Earl"};

obj[key] === "Earl";
//=> true

doSomethingThatMutatesStrings(key);

obj[key];
//=> undefined

obj["lemonjon"];
//=> "Earl"



var obj = {lemongrab: "Earl"};

(function(o) {
    _.extend(o, {lemongrab: "King"});
})(obj);

obj;
//=> {lemongrab: "King"}
