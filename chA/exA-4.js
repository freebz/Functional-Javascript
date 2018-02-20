// A.1.4 빌비

var animals = bilby.environment();



function voice(type, sound) {
    return ["The", type, "says", sound].join(' ');
}

function isA(thing) {
    return function(obj) {
	return obj.type == thing;
    }
}

function say(sound) {
    return function(obj) {
	console.log(voice(obj.type, sound));
    }
}



var animals = animals.method('speak', isA('cat'), say("mew"));



animals.speak({type: 'cat'});
// The cat says mew



var animals = animals.method('speak', isA('dog'), say("woof"));


animals.speak({type: 'cat'});
// The cat says mew

animals.speak({type: 'dog'});
// The dog says woof



var animals = animals.method('speak',
    function(obj) {
	return (isA('frog')(obj) && (obj.status == 'dead'))
    },
    say('Hello ma, baby!'));



animals.speak({type: 'frog', status: 'dead'});
// The frog says Hello ma, baby!
