// 5.4 함수의 끝을 서로 연결하는 함수 조립 방법

!_.isString(name)



function isntString(str) {
    return !_.isString(str);
}

isntString(1);
//=> true



var isntString = _.compose(function(x) { return !x }, _.isString);

isntString([]);
//=> true



                                 !       _.isString("a");
_.compose(function(str) { return !str }, _.isString)("a");



function not(x) { return !x }



var isntString = _.compose(not, _.isString);



var composedMapcat = _.compose(splat(cat), _.map);

composedMapcat([[1,2],[3,4],[5]], _.identity);
//=> [1, 2, 3, 4, 5]
