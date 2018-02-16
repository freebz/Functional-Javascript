// 6.1.1 재귀를 이용한 그래프 탐색

var influences = [
    ['Lisp', 'Smalltalk'],
    ['Lisp', 'Scheme'],
    ['Smalltalk', 'Self'],
    ['Scheme', 'JavaScript'],
    ['Scheme', 'Lua'],
    ['Self', 'Lua'],
    ['Self', 'JavaScript']];



function nexts(graph, node) {
    if (_.isEmpty(graph)) return [];

    var pair = _.first(graph);
    var from = _.first(pair);
    var to   = second(pair);
    var more = _.rest(graph);

    if (_.isEqual(node, from))
	return construct(to, nexts(more, node));
    else
	return nexts(more, node);
}



nexts(influences, 'Lisp');
//=> ["Smalltalk", "Scheme"]
