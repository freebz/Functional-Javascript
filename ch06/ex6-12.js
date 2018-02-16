// 6.4 재귀는 저수준 동작이다

var groupFrom = curry2(_.groupBy)(_.first);
var groupTo   = curry2(_.groupBy)(second);



groupFrom(influences);
//=> {Lisp:[["Lisp", "Smalltalk" ], ["Lisp", "Scheme"]],
//    Smalltalk:[["Smalltalk", "Self"]],
//    Scheme:[["Scheme", "JavaScript"], ["Scheme", "Lua"]],
//    Self:[["Self", "Lua"], ["Self", "JavaScript"]]}

groupTo(influences);
//=> {Smalltalk:[['Lisp', 'Smalltalk']],
//    Scheme:[['Lisp', 'Scheme']],
//    Self:[['Smalltalk', 'Self']],
//    JavaScript:[['Scheme', 'JavaScript'], ['Self', 'JavaScript']],
//    Lua:[['Scheme', 'Lua'], ['Self', 'Lua']]}



function influenced(graph, node) {
    return _.map(groupFrom(graph)[node], second);
}



influencedWithStrategy(preDepth, 'Lisp', influences);
//=> ["Smalltalk", "Smalltalk", "Scheme", "Scheme"]

influenced(influences, 'Lisp');
//=> ["Smalltalk", "Scheme"]
