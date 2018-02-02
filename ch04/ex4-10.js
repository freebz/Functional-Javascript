// 4.3 지금까지 배운 내용을 모두 활용: 객체 검증자

/*
{message: "Hi!",
 type: "display",
 from: "http://localhost:8080/node/frob"}
*/


function checker(/* 검증자 */) {
    var validators = _.toArray(arguments);
    
    return function(obj) {
	return _.reduce(validators, function(errs, check) {
	    if (check(obj))
		return errs;
	    else
		return _.chain(errs).push(check.message).value();
	}, []);
    };
}


/*
{
    errs.push(check.message);
    return errs;
}
*/


var alwaysPasses = checker(always(true), always(true));
alwaysPasses({});
//=> []

var fails = always(false);
fails.message = "a failure in life";
var alwaysFails = checker(fails);

alwaysFails({});
//=> ["a failure in life"]



function validator(message, fun) {
    var f = function(/* 인자 */) {
	return fun.apply(fun, arguments);
    };

    f['message'] = message;
    return f;
}



var gonnaFail = checker(validator("ZOMG!", always(false)));

gonnaFail(100);
//=> ["ZOMG!"]



function aMap(obj) {
    return _.isObject(obj);
}



var checkCommand = checker(validator("must be a map", aMap));



checkCommand({});
//=> true

checkCommand(42);
//=> ["must be a map"]


function cat() {
    var head = _.first(arguments);
    if (existy(head))
	return head.concat.apply(head, _.rest(arguments));
    else
	return [];
}

function hasKeys() {
    var KEYS = _.toArray(arguments);

    var fun = function(obj) {
	return _.every(KEYS, function(k) {
	    return _.has(obj, k);
	});
    };

    fun.message = cat(["Must have values for keys:"], KEYS).join(" ");
    return fun;
}



var checkCommand = checker(validator("must be a map", aMap),
			   hasKeys('msg', 'type'));



checkCommand({msg: "blah", type: "display"});
//=> []

checkCommand(32);
//=> ["must be a map", "Must have values for keys: msg type"]

checkCommand({});
//=> ["Must have values for keys: msg type"]
