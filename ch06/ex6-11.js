// 6.3.2 트램펄린 원칙과 콜백

setTimeout(function() { console.log("hi") }, 2000);
//=> 바로 어떤 값을 반환한다.
// ... 약 이초 뒤
// hi



function asyncGetAny(interval, urls, onsuccess, onfailure) {
    var n = urls.length;

    var looper = function(i) {
	setTimeout(function() {
	    if (i >= n) {
		onfailure("failed");
		return;
	    }

	    $.get(urls[i], onsuccess)
		.always(function() { console.log("try: " + urls[i]) })
		.fail(function() {
		    looper(i + 1);
		});
	}, interval);
    }

    looper(0);
    return "go";
}



var urls = ['http://dsfgfgs.com', 'http://sghjgsj.biz', '_.html', 'foo.txt'];

asyncGetAny(2000,
  urls,
  function(data) { alert("Got some data") },
  function(data) { console.log("all failed") });
//=> "go"

// (2초 후 콘솔) try: http://dsfgfgs.com
// (2초 후 콘솔) try: http://sghjgsj.biz
// (2초 후 콘솔) try: _.html
// 'Got some data'라는 내용의 알림 팝업 창이 뜬다(내 컴퓨터에).
