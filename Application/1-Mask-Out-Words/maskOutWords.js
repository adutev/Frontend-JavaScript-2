words = ["yesterday", "Dog", "food", "walk"]
text = "Yesterday, I took my dog for a walk.\n It was crazy! My dog wanted only food."

function maskOutWords(words, text) {
	for(var i in words) {
		var replaceWord = Array(words[i].length + 1).join('*');
		var find = words[i];
		text = text.replace(new RegExp(find, 'gi'), replaceWord)
	}	

	return text
}

console.log(maskOutWords(words, text))