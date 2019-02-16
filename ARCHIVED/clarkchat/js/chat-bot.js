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

		var unknown = ["I don't know what that means..", "Errr... Error? Does not compute.", "Dude. Idk what you're saying...", "I'm not too smart to understand that yet. Whoops"][Math.floor(Math.random() * 4)];
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
