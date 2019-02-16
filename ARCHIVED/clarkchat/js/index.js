$(".overlay").hide();
$(".container").show();
$('.overlay').bind('keydown', function(e) {
	if(e.keyCode == 13) {
		usersName = $('.name').val;
		 $(".overlay").hide();
		 $(".container").show();
	};
});
$(function() {

	// chat aliases
	var you = '2';
	var robot = '1';

	// slow reply by 400 to 800 ms
	var delayStart = 400;
	var delayEnd = 800;

	// initialize
	var bot = new chatBot();
	var chat = $('.chat');
	var waiting = 0;
	$('.busy').text(robot + ' is typing...');

	// submit user input and get chat-bot's reply
	var submitChat = function() {

		var input = $('.input input').val();
		if(input == '') return;

		$('.input input').val('');
		updateChat(you, input);

		var reply = bot.respondTo(input);
		if(reply == null) return;

		var latency = Math.floor((Math.random() * (delayEnd - delayStart)) + delayStart);
		$('.busy').css('display', 'block');
		waiting++;
		setTimeout( function() {
			if(typeof reply === 'string') {
				updateChat(robot, reply);
			} else {
				for(var r in reply) {
					updateChat(robot, reply[r]);
				}
			}
			if(--waiting == 0) $('.busy').css('display', 'none');
		}, latency);
	}

	// add a new line to the chat
	var updateChat = function(party, text) {

		var style = 'you';
		if(party != you) {
			style = 'other';
		}

		var line = $('<div class="chatlines"><span class="party"></span> <span class="text"></span></div>');
		line.find('.party').addClass(style).text(party + ':');
		line.find('.text').text(text);

		chat.append(line);

		chat.stop().animate({ scrollTop: chat.prop("scrollHeight")});

	}

	// event binding
	$('.input').bind('keydown', function(e) {
		if(e.keyCode == 13) {
			submitChat();
		}
	});
	$('.input a').bind('click', submitChat);

	// initial chat state
	var initGreet = ["Hey dude!", "Howdy", "Hello ;)", "Greetings", "Mah Nigga!", "Whaddup Mah Nigga?", "Hi!!!", "Hi!", "Want Nudes?"][Math.floor(Math.random() * 9)]
	updateChat(robot, initGreet);

});
