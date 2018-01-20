const _ = require('underscore');


function lameCSV(str) {
    return _.reduce(str.split("\n"), function(table, row) {
	table.push(_.map(row.split(","), function(c) { return c.trim()}));
	return table;
    }, []);
};


var peopleTable = lameCSV("name,age,hair\nMerble,35,red\nBob,64,blonde");

peopleTable;
//=> [[ 'name', 'age', 'hair'],
//   ['Merble', '35',  'red'],
//   ['Bob',    '64',  'blonde']]



_.rest(peopleTable).sort();
//=> [['Bob',   '64', 'blonde'],
//   ['Merble', '35', 'red']]



function selectNames(table) {
    return _.rest(_.map(table, _.first));
}

function selectAges(table) {
    return _.rest(_.map(table, second));
}

function selectHairColor(table) {
    return _.rest(_.map(table, function(row) {
	return nth(row, 2);
    }));
}

var mergeResults = _.zip;



selectNames(peopleTable);
//=> ['Merble', 'Bob']


selectAges(peopleTable);
//=> ["35", "64"]

selectHairColor(peopleTable);
//=> ["red", "blonde"]

mergeResults(selectNames(peopleTable), selectAges(peopleTable));
//=> [["Merble", "35"], ["Bob", "64"]]
