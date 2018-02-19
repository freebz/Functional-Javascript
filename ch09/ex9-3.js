// 9.2 믹스인

function polyToString(obj) {
    if (obj instanceof String)
	return obj;
    else if (obj instanceof Array)
	return stringifyArray(obj);

    return obj.toString();
}

function stringifyArray(ary) {
    return ["[", _.map(ary, polyToString).join(","), "]"].join('');
}



polyToString([1,2,3]);
//=> "[1,2,3]"

polyToString([1,2,[3,4]]);
//=> "[1,2,[3,4]]"



var polyToString = dispatch(
    function(s) { return _.isString(s) ? s : undefined },
    function(s) { return _.isArray(s) ? stringifyArray(s) : undefined },
    function(s) { return s.toString() });



polyToString(42);
//=> "42"

polyToString([1,2,[3,4]]);
//=> "[1,2,[3,4]]"

polyToString('a');
//=> "a"



polyToString({a: 1, b: 2});
//=> "[object Object]"



var polyToString = dispatch(
    function(s) { return _.isString(s) ? s : undefined },
    function(s) { return _.isArray(s) ? stringifyArray(s) : undefined },
    function(s) { return _.isObject(s) ? JSON.stringify(s) : undefined },
    function(s) { return s.toString() });



polyToString([1,2,{a: 42, b: [4,5,6]}, 77]);
//=> "[1,2,{"a":42,"b":[4,5,6]},77]"



polyToString(new Container(_.range(5)));
//=> {"_value":[0,1,2,3,4]}
