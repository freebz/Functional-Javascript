// 3.1 전역 스코프

const _ = require('underscore');


aGlobalVariable = 'livin la vida global';



_.map(_.range(2), function() { return aGlobalVariable });
//=> [ 'livin la vida global', 'livin la vida global' ]



aGlobalVariable = 'i drink your milkshake';

aGlobalVariable;
//=> 'i drink your milkshake'



function makeEmptyObject() {
    return new Object();
}
