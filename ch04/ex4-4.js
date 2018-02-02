// 값 대신 함수를 사용하라

function repeatedly(times, fun) {
    return _.map(_.range(times), fun);
}

repeatedly(3, function() {
    return Math.floor((Math.random()*10)+1);
});
//=> [1, 3, 8]



repeatedly(3, function() { return "Odelay!"; });
//=> [ 'Odelay!', 'Odelay!', 'Odelay!' ]



repeatedly(3, function(n) {
    var id = 'id' +  n;
    $('body').append($("<p>Odelay</p>").attr('id', id));
    return id;
});

// 페이지는 세 개의 Odelay를 포함하게 된다.
//=> ["id0", "id1", "id2"]
