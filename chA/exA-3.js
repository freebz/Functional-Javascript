// A.1.3 RxJS

var codes = [
    38, // up
    38, // up
    40, // down
    40, // down
    37, // left
    39, // right
    37, // left
    39, // right
    66, // b
    65  // a
];



function isKonamiCode(seq) {
    return seq.sequenceEqual(codes);
}



var kePressStream = $(document).keyupAsObservable()
    .select(function (e) { return e.keyCode })
    .windowWithCount(10, 10);



keyPressStream
    .selectMany(isKonamiCode)
    .where(_.identity)
    .subscribe(function () {
	alert("You now have thirty lives!");
    });
