// 7.1.3 비순수한 함수의 프로퍼티 테스트

describe("generateRandomCharacter", function() {
    var result = repeatedly(1000, generateRandomCharacter);

    it("shuold return only strings of length 1", function() {
	expect(_.every(result, _.isString)).toBeTruthy();
	expect(_.every(result, function(s) { return s.length === 1 })).toBeTruthy();
    });

    it("should return a string of only lowercase ASCII letters of digits", function() {
	expect(_.every(result, function(s) {
	    return /[a-z0-9]/.test(s) })).toBeTruthy();

	expect(_.any(result, function(s) { return /[A-Z]/.test(s) })).toBeFalsy();
    });
});
