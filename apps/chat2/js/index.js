
//If you fork this, please change this database link to your own.
var fb = new Firebase("https://clarkhacks-db.firebaseio.com/chat/v2/");

if(window.location.hash) {
  var messages = fb.child("messages/" + window.location.hash.substr(1));
} else {
  var messages = fb.child("messages");
}
var btn = $('button');
var wrap = $('.wrapper');
var input = $('input.message');
var usernameInput = $('input.username');

var user = [];

(function($) {
	$.sanitize = function(input) {
		var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
					 replace(/<[\/\!]*?[^<>]*?>/gi, '').
					 replace(/<style[^>]*?>.*?<\/style>/gi, '').
					 replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
	    return output;
	};
})(jQuery);

usernameInput.on('keyup', function(e) {
	if (e.keyCode === 13 && usernameInput.val().length > 0) {
		var getTxt = usernameInput.val();
		user.push(getTxt);
		usernameInput.val('');
		$('.initModal').css('display', 'none');
		console.log(user);
		messages.push({
			user: "[BOT1]",
			message: user + " Has Joined"
		});
	}

});



input.on('keyup', function(e) {
	var curUsername = user.join();
	if (e.keyCode === 13 && input.val().length > 0) {
		var getTxt = input.val();
		messages.push({
			user: curUsername,
			message: getTxt
		});
		if (getTxt === "@BOT1"){
			messages.push({
			user: "[BOT1]",
			message: "@" + user + " How may I assist you?"
		});
			input.val('');
			input.attr("placeholder", "Ask a question or give a command...");
		}
		input.val('');
	}
});

messages.limitToLast(100).on("child_added", function(snap) {
	wrap.append('<li><span class\=\"message">' + $.sanitize(snap.val().user) + ':</span> ' + $.sanitize(snap.val().message) + '</li>');
	window.scrollTo(0,document.body.scrollHeight);
});
