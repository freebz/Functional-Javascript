// 3.4 함수 스코프

function strangeIdentity(n) {
    // 의도적으로 이상한 동작 수행
    for(var i=0; i<n; i++);
    return i;
}

strangeIdentity(138);
//=> 138



function strangeIdentity(n) {
    var i;
    for(i=0; i<n; i++);
    return i;
}



function strangeIdentity(n) {
    // 이번에도 의도적으로 이상한 동작 수행
    for(this['i'] = 0; this['i']<n; this['i']++);
    return this['i'];
}

strangeIdentity(108);
//=> 108



i;
//=> 108



strangeIdentity.call({}, 10000);
//=> 10000

i;
//=> 108



function f () {
    this['a'] = 200;
    return this['a'] + this['b'];
}

var globals = {'b': 2};

f.call(_.clone(globals));
//=> 202



globals;
//=> {'b': 2}
