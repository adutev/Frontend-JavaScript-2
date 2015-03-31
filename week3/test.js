var	counter = 1000000;
var one = 0;
var zero = 0;
while(counter > 0) {
	if(Math.random() > 0.5){
		one++;
	} else {
		zero++;
	}
	counter--;
}
console.log('ones: ' + one + ', zeoes: ' + zero);