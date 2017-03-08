function chatBot() {

	// current user input
	this.input;

	/**
	 * respondTo
	 *
	 * return nothing to skip response
	 * return string for one response
	 * return array of strings for multiple responses
	 *
	 * @param input - input chat string
	 * @return reply of chat-bot
	 */
	this.respondTo = function(input) {

		this.input = input.toLowerCase();

		if(this.match('(h(i)+|hello|h(e)+(y)+|hola|howdy)(\\s|!|\\.|$)')){
		var responseOne = ["Hey dude!", "Howdy", "Hello ;)", "Greetings", "Mah Nigga!"][Math.floor(Math.random() * 5)]
		return responseOne;
};
		if(this.match('what[^ ]* up|how are you|wyd')){
			var responseTwo = ["Well, I'm building a robot", "Doing greaattt", "Weed. Weed. Weed. Smokey Smokey", "Smoking", "Weed", "Weeeeed", "Smoking some herrbb", "that herb", "Crystal Meth <3"][Math.floor(Math.random() * 10)]
			return responseTwo;
};
		if(this.match('l(ol)+') || this.match('(ha)+(h|$)') || this.match('lmao')){
			return "what's so funny?";
};
		if(this.match('^no+(\\s|!|\\.|$)')){
			return "don't be such a negative nancy :(";
};
		if(this.match('(cya|bye|see ya|ttyl|talk to you later)')){
			return ["alright, see you around", "good teamwork!"];
};
		if(this.match('(dumb|stupid|is that all|retarded|retard|you suck)')){
			return ["hey i'm just a proof of concept", "you can make me smarter if you'd like"];
};
		if(this.input == 'noop'){
			return;
};
		if(this.match('$ -clear|$ -c')){
			$( ".chatlines" ).remove();
			return "Chat Cleared";	
};
		if(this.match('$ -help|$ -h')){
			return ["$ -clear : Clears Chat", "$ -help : Lists helful commands", "$ -reload : Reloads Chat"];	
};
		if(this.match('$ -reload|$ -r')){
		location.reload();
};
		var unknown = ["I don't know what that means..", "Errr... Error? Does not computer.", "Dude. Idk what you're saying..."][Math.floor(Math.random() * 3)];
		return unknown;
	}

	/**
	 * match
	 *
	 * @param regex - regex string to match
	 * @return boolean - whether or not the input string matches the regex
	 */
	this.match = function(regex) {

		return new RegExp(regex).test(this.input);
	}
}
