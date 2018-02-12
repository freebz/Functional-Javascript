// 커링으로 새로운 함수 만들기

var plays = [{artist: "Burial", track: "Archangel"},
	     {artist: "Ben Frost", track: "Stomp"},
	     {artist: "Ben Frost", track: "Stomp"},
	     {artist: "Burial", track: "Archangel"},
	     {artist: "Emeralds", track: "Snores"},
	     {artist: "Burial", track: "Archangel"}];

_.countBy(plays, function(song) {
    return [song.artist, song.track].join(" - ");
});
//=> {"Ben Frost - Stomp": 2,
//    "Burial - Archangel": 3,
//    "Emeralds - Snores": 1}



function songToString(song) {
    return [song.artist, song.track].join(" - ");
}

var songCount = curry2(_.countBy)(songToString);

songCount(plays);
//=> {"Ben Frost - Stomp": 2,
//    "Burial - Archangel": 3,
//    "Emeralds - Snores": 1}
