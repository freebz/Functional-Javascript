// 세 개의 파라미터를 커링해서 HTML 16진 색상 생성기 구현하기

function curry3(fun) {
    return function(last) {
	return function(middle) {
	    return function(first) {
		return fun(first, middle, last);
	    };
	};
    };
};



var songsPlayed = curry3(_.uniq)(false)(songToString);

songsPlayed(plays);
//=> {artist: "Burial", track: "Archangel"},
//   {artist: "Ben Frost", track: "Stomp"},
//   {artist: "Emeralds", track: "Snores"}]



_.uniq(plays, false, songToString);

curry3(_.uniq)(false)(songToString);



function toHex(n) {
    var hex = n.toString(16);
    return (hex.length < 2) ? [0, hex].join(''): hex;
}

function rgbToHexString(r, g, b) {
    return ["#", toHex(r), toHex(g), toHex(b)].join('');
}

rgbToHexString(255, 255, 255);
//=> "#ffffff"



var blueGreenish = curry3(rgbToHexString)(255)(200);

blueGreenish(0);
//=> "#00c8ff"
