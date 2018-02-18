// 7.1.1 순수성과 테스트의 관계

describe("randString", function() {
    it("builds a string of lowercase ASCII letters/digits", function() {
	expect(randString()).to???(???);
    });
});



describe("_.map", function() {
    it("should return an array made frm...", function(){
	expect(_.map([1,2,3], sqr)).toEqual([1, 4, 9]);
    });
});



PI = 3.14;

function areaOfACircle(radius) {
    return PI * sqr(radius);
}

areaOfACircle(3);
//=> 28.26



// ... 코드 생략

PI = "Magnum";

// ... 코드 생략



areaOfACircle(3);
//=> NaN
