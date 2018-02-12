// 5.4.1 조립을 이용해서 선행조건과 후행조건 만들기

var sqrPost = condition1(
    validator("result should be a number", _.isNumber),
    validator("result should be not be zero", complement(zero)),
    validator("result should be positive", greaterThan(0)));



sqrPost(_.identity, 0);
// Error: result should be not be zero, result should be positive

sqrPost(_.identity, -1);
// Error: result should be positive

sqrPost(_.identity, '');
// Error: result should be a number, result should be positive



var megaCheckedSqr = _.compose(partial(sqrPost, _.identity), checkedSqr);



megaCheckedSqr(10);
//=> 100

megaCheckedSqr(0);
// Error: arg must not be zero



megaCheckedSqr(NaN);
// Error: result should be positive
