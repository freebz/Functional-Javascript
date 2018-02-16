// 6.1.2 메모리에서 깊이 우선 재귀 탐색하기

function depthSearch(graph, nodes, seen) {
    if (_.isEmpty(nodes)) return rev(seen);

    var node = _.first(nodes);
    var more = _.rest(nodes);

    if (_.contains(seen, node))
	return depthSearch(graph, more, seen);
    else
	return depthSearch(graph,
			   cat(nexts(graph, node), more),
			   construct(node, seen));
}



depthSearch(influences, ['Lisp'], []);
//=> ["Lisp", "Smalltalk", "Self", "Lua", "JavaScript", "Scheme"]

depthSearch(influences, ['Smalltalk', 'Self'], []);
//=> ["Smalltalk", "Self", "Lua", "JavaScript"]

depthSearch(construct(['Lua', 'Io'], influences), ['Lisp'], []);
//=> ["Lisp", "Smalltalk", "Self", "Lua", "Io", "JavaScript", "Scheme"]
