function Panda (name, sex) {
	this.name = name;
	this.sex = sex;
	if(['male', 'female'].indexOf(sex) === -1) {
		this.sex = sex;
	}
	this.weight = 20;
}

Panda.prototype.isMale = function() {
	return this.sex === 'male';
};

Panda.prototype.isFemale = function() {
	return this.sex === 'female';
};

Panda.prototype.eat = function(bamboo) {
	if(this.weight <= 80){
		this.weight += bamboo/2;
		if(this.weight > 80) {
			this.name = 'Lazy Panda ' + this.name; 
		}		
	} else {
		this.weight += bamboo/2;
	}
};

Panda.prototype.mate = function(anotherPanda) {
	var babySex = '';
	var babyName = '';
	var motherName = this.name;
	var fatherName = anotherPanda.name;

	if(this.sex !== anotherPanda.sex) {
		if(anotherPanda.isFemale()) {
			motherName = anotherPanda.name;
			fatherName = this.name;
		}


		if(Math.random() > 0.5) {
			babySex = 'male';
		} else {
			babySex = 'female';
		}
		if(babySex === 'male'){
			babyName = fatherName + " " + motherName;
		} else {
			babyName = motherName + " " + fatherName;
		}
		return new Panda(babyName, babySex);

	} else {
		console.error('CannotMatePandas');
	}
};

Panda.prototype.toString = function() {
	return this.name + " is a " + this.sex + " panda which weighs " + this.weight + " kg";
};

var ivo = new Panda("Ivo", "male");

console.log(ivo.weight == 20); // true
console.log(ivo.isMale() == true); // true
console.log(ivo.isFemale() == false); // true
console.log(ivo.toString() == "Ivo is a male panda which weighs 20 kg"); // true

ivo.eat(80);
console.log(ivo.weight == 60); // true

ivo.eat(80);
console.log(ivo.weight == 100); // true

console.log(ivo.name == "Lazy Panda Ivo") // true

var ivan = new Panda("Ivan", "male");
var ivanka = new Panda("Ivanka", "female");

var baby = ivan.mate(ivanka);
var gayBaby = ivan.mate(ivan);
console.log(baby.name)
ivo.eat(100);
console.log(ivo.name)