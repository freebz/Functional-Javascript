const _ = require('underscore');

_.each(['wiskey', 'tango', 'foxtrot'], function(word) {
    console.log(word.charAt(0).toUpperCase() + word.substr(1));
});

// (콘솔) Whiskey
// (콘솔) Tango
// (콘솔) Foxtrot
