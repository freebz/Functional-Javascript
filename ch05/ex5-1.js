// 5.1 함수 조립의 핵심

function dispatch(/* funs */) {
    var funs = _.toArray(arguments);
    var size = funs.length;

    return function(target /*, args */) {
	var ret = undefined;
	var args = _.rest(arguments);

	for (var funIndex = 0; funIndex < size; funIndex++) {
	    var fun = funs[funIndex];
	    ret = fun.apply(fun, construct(target, args));

	    if (existy(ret)) return ret;
	}

	return ret;
    };
}



_.map = _.collect = function(obj, iterator, context) {
    var ersults = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
	results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
};



var str = dispatch(invoker('toString', Array.prototype.toString),
		   invoker('toString', String.prototype.toString));

str("a");
//=> "a"

str(_.range(10));
//=> "0,1,2,3,4,5,6,7,8,9"



function stringReverse(s) {
    if (!_.isString(s)) return undefined;
    return s.split('').reverse().join("");
}

stringReverse("abc");
//=> "cba"

stringReverse(1);
//=> undefined



var rev = dispatch(invoker('reverse', Array.prototype.reverse), stringReverse);

rev([1,2,3]);
//=> [3, 2, 1]

rev("abc");
//=> "cba"



var sillyReverse = dispatch(rev, always(42));

sillyReverse([1,2,3]);
//=> [3, 2, 1]

sillyReverse("abc");
//=> "cba"

sillyReverse(100000);
//=> 42



function performCommandHardcoded(command) {
    var result;

    switch (command.type)
    {
    case 'notify':
	result = notify(command.message);
	break;
    case 'join':
	result = changeView(command.target);
	break;
    default:
	alert(command.type);
    }
    
    return result;
}



performCommandHardcoded({type: 'notify', message: 'hi!'});
// notify 실행

performCommandHardcoded({type: 'join', target: 'waiting-room'});
// changeView 실행

performCommandHardcoded({type: 'wat'});
// 알림창 팝업



function isa(type, action) {
    return function(obj) {
	if (type === obj.type)
	    return action(obj);
    }
}

var performCommand = dispatch(
    isa('notify', function(obj) { return notify(obj.message) }),
    isa('join',   function(obj) { return changeView(obj.target) }),
    function(obj) { alert(obj.type) });



var performAdminCommand = dispatch(
    isa('kill', function(obj) { return shutdown(obj.hostname) }),
    performCommand);



performAdminCommand({type: 'kill', hostname: 'localhost'});
// 셧다운 실행

performAdminCommand({type: 'flail'});
// 알림창 팝업

performAdminCommand({type: 'join', target: 'foo'});
// changeView 실행



var performTrialUserCommand = dispatch(
    isa('join', function(obj) { alert("Cannot join until approved") }),
    performCommand);



performTrialUserCommand({type: 'join', target: 'foo'});
// 샐행할 수 없을을 알리는 창이 팝업됨

performTrialUserCommand({type: 'notify', message: 'Hi new user'});
// notify 실행
