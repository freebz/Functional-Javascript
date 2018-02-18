// 7.1.2 순수성과 비순수성 구별하기

function generateRandomCharacter() {
    return rand(26).toString(36);
}

function generateString(charGen, len) {
    return repeatedly(len, charGen).join('');
}



generateString(generateRandomCharacter, 20);
//=> "2lfhjo45n2nfnpbf7m7e"



var comosedRandomString = partial1(generateString, generateRandomCharacter);

comosedRandomString(10);
//=> "j18obij1jc"



describe("generateString", function() {
    var result = generateString(alwyas("a"), 10);

    if("should return a string of a specific length", function() {
	expect(result.constructor).toBe(String);
	expect(result.length).toBe(10);
    });

    if("should return a string congruent with its char generator", function() {
	expect(result).toEqual("aaaaaaaaaa");
    });
});
