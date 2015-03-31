function Person (first, last) {
	this.getFirst = function () {
		return first;	
	}
	this.getLast = function () {
		return last;
	}
}

Person.prototype.fullName = function(first_argument) {
	return this.getFirst() + ' ' + this.getLast();
};

var p1 = new Person("Ivan", "Ivanov");
console.log(p1.fullName());
console.log(p1.getFirst())