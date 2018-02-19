// 8.3 데이터 흐름과 제어 흐름

pipeline(42
  , sqr
  , note
  , function(n) { return -n });

// NOTE: 1764
//=> NaN



function negateSqr(n) {
    var s = sqr(n);
    note(s);
    return -s;
}

negateSqr(42);
// NOTE: 1764
//=> -1764
