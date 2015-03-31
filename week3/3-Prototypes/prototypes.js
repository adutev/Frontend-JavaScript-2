String.prototype.caitalize = function() {
	return this.toUpperCase();
};

String.prototype.isBlank = function() {
	return (/^\s*$/.test(this.toString()));
}

String.prototype.words = function() {
	return  this.split(' ');;
}

String.prototype.format = function() {
	var result = this;

	if(arguments.length > 1) {
		for(var i in arguments){
			result = result.replace('{}', arguments[i]);
		}
		return result;		
	} else if(arguments.length === 1) {
		for(var key in arguments[0]){
			var find = '{'+ key + '}';
			result = result.replace(find, arguments[0][key]);
		}
		return result;
	}
}

console.log('asdasd'.caitalize());
console.log('  ads '.isBlank())
console.log('This is my life.'.words())
var name = "What?";
var result = "Hi, my name is {}. Nice to meet you {}".format(name, "Good sir!");
console.log(result);

var replaces = { "name": "Ivan", "language": "Bulgarian" };
var result = "Hello there {name}! Do you speak {language}?".format(replaces);
console.log(result);