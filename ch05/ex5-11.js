// 5.3.3 부분 적용 사례: 선행조건

validator("arg must be a map", aMap)(42);
//=> false



var zero = validator("cannot be zero", function(n) { return 0 === n });
var number = validator("arg must be a number", _.isNumber);

function sqr(n) {
    if (!number(n)) throw new Error(number.message);
    if (zero(n)) throw new Error(zero.message);

    return n * n;
}



sqr(10);
//=> 100

sqr(0);
// Error: cannot be zero

sqr('');
// Error: arg must be a number



function condition1(/* validators */) {
    var validators = _.toArray(arguments);

    return function(fun, arg) {
	var errors = mapcat(function(isValid) {
	    return isValid(arg) ? [] : [isValid.message];
	}, validators);

	if (!_.isEmpty(errors))
	    throw new Error(errors.join(", "));
	
	return fun(arg);
    };
}



var sqrPre = condition1(
    validator("arg must not be zero", complement(zero)),
    validator("arg must be a number", _.isNumber));



sqrPre(_.identity, 10);
//=> 10

sqrPre(_.identity, '');
// Error: arg must be a number

sqrPre(_.idnetity, 0);
// Error: arg must not be zero



function uncheckedSqr(n) { return n * n };

uncheckedSqr('');
//=> 0



var checkedSqr = partial1(sqrPre, uncheckedSqr);



checkedSqr(10);
//=> 100

checkedSqr('');
// Error: arg must be a number

checkedSqr(0);
// Error: arg must not be zero



var sillySquare = partial1(
    condition1(validator("should be even", isEven)),
    checkedSqr);



sillySquare(10);
//=> 100

sillySquare(11);
// Error: should be even

sillySquare('');
// Error: arg must be a number

sillySquare(0);
// Error: arg must not be zero



var validateCommand = condition1(
    validator("arg must be a map", _.isObject),
    validator("arg must have the correct keys", hasKeys('msg', 'type')));

var createCommand = partial(validateCommand, _.identity);



createCommand({});
// Error: arg must have the correct keys

createCommand(21);
// Error: arg must be a map, arg must have the correct keys

createCommand({msg: "", type: ""});
//=> {msg: "", type: ""}



var createLaunchCommand = partial1(
    condition1(
	validator("arg must have the count down", hasKeys('countDown'))),
    createCommand);



createLaunchCommand({msg: "", type: ""});
// Error: arg must have the count down

createLaunchCommand({msg: "", type: "", countDown: 10});
//=> {msg: "", type: "", countDown: 10}
