const _ = require('underscore');


_.find(['a', 'b', 3, 'd'], _.isNumber);
//=> 3
