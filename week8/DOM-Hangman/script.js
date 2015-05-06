$(document).ready(function () {
	var secretWord = 'Africa';
	var guessStatus = [];
	for (var ch in secretWord) {
		guessStatus.push('_');
	}

	var charactersLeftToguess = secretWord.length;

	var lives = 5;

	$('#lives').text(lives);

	composeResultStatus(secretWord);

	$('#submit').click(function () {
		checkCharacter();
		$('#character').val('');
	});		
	
	function composeResultStatus() {
		var resultSpan = '';
		resultSpan = guessStatus.join(' ');
		$('#result').text(resultSpan);		
	}

	function checkCharacter() {
		var character = $('#character').val().toLowerCase();
		if(secretWord.toLowerCase().indexOf(character) !== -1 && character !== ''){
			for(var i = 0; i < secretWord.length; i++) {
				if(secretWord[i].toLowerCase() === character) {
					guessStatus[i] = secretWord[i];
					charactersLeftToguess--;
					composeResultStatus();
				}
			}
			if(charactersLeftToguess === 0) {
				alert('Congrats!');
			}
		} else {
			decreaseLives();
		}
	}

	function decreaseLives () {
		lives--;
		$('#lives').text(lives);
		if(lives === 0) {
			var reset = confirm('Game over. Do you want to continue?');
			if(reset) {
				initGame();
			}
		}
	}
	function initGame() {
		lives = 5;
		guessStatus = [];
		for (var ch in secretWord) {
			guessStatus.push('_');
		}
		composeResultStatus();
		$('#lives').text(lives);
		charactersLeftToguess = secretWord.length;
	}
});