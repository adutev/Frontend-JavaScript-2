var WORD_LENGHT = 4;
var prompt = require('prompt');

prompt.start();

var numberToGuess = '';

for (var i = 0; i < WORD_LENGHT; i++) {
	numberToGuess += Math.floor(Math.random()*10) + ''
};

console.log("The number you have to guess is: " + numberToGuess)

function guessNumber(){
	prompt.get([
		{
	    	name: 'playerGuess',
	    	require: true
	    }], function (err, result) {
			console.log('Enter your guess:');
			console.log("Number to guiess: " + numberToGuess)
			if(numberToGuess === result.playerGuess) {
				console.log("You found the magic number!")
			} else {
				findBulls(numberToGuess, result.playerGuess)
				guessNumber();
			}
		});
}

function findBulls (numberToGuess, playerGuess) {
	var playerGuess = playerGuess.toString()
	var result = { bulls: 0, cows: 0 }

	for (var i = 0; i < WORD_LENGHT; i++) {
		var hasDigit = numberToGuess.indexOf(playerGuess[i]) != -1;
		if(hasDigit){
			if(numberToGuess[i] === playerGuess[i]) {
				result.bulls++;
			}
			else {
				result.cows++;
			}			
		}
	};

	console.log(result)
	
	return result;
}

guessNumber();
