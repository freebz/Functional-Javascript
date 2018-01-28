// 3.3.1 자바스크립트의 동적 스코프

function globalThis() { return this; }

globalThis();
//=> Window 같은 어떤 전역 객체

globalThis.call('barnabas');
//=> 'barnabas'

globalThis.apply('orsulak', []);
//=> 'orsulak'



var nopeThis = _.bind(globalThis, 'nope');

nopeThis.call('wat');
//=> 'nope'



var target = {name: 'the right value',
	      aux: function() { return this.name; },
	      act: function() { return this.aux(); }};

target.act.call('wat');
// TypeError: this.aux is not a function

_.bindAll(target, 'aux', 'act');

target.act.call('wat');
//=> 'the right value'
