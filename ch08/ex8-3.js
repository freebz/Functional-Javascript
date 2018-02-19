// 8.1.2 프로미스

var longing = $.Deferred();



longing.promise();
//=> Object



longing.promise().state();
//=> "pending"



longing.resolve("<3");

longing.promise().state();
//=> "resolved"



longing.promise().done(note);
// NOTE: <3
//=> <the promise itself>



function go() {
    var d = $.Deferred();

    $.when("")
	.then(function() {
	    setTimeout(function() {
		console.log("sub-task 1");
	    }, 5000)
	})
	.then(function() {
	    setTimeout(function() {
		console.log("sub-task 2");
	    }, 10000)
	})
	.then(function() {
	    setTimeout(function() {
		d.resolve("done done done done");
	    }, 15000)
	})

    return d.promise();
}



var yearning = go().done(note);



yearning.state();
//=> "pending"



// (콘솔) sub-task 1



yearning.state();
//=> "pending"



// (콘솔) sub-task2

// ... ~ 5초 후

// NOTE: done done done done



yearning.state();
//=> "resolved"
