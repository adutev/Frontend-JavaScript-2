function MutablePoint3d (x, y, z) {
	this.getX = function () {
		return x;
	}
	this.getY = function () {
		return y;
	}
	this.getZ = function () {
		return z;
	}
	this.move = function(dx, dy, dz) {
		x += dx;
		y += dy;
		z += dz;
	}
};

MutablePoint3d.prototype.toString = function() {
	return "(" + [this.getX(), this.getY(), this.getZ()].join(", ") + ")";
};

var p1 = new MutablePoint3d(0, 0, 0); 
p1.move(0,0,-1);
console.log(p1.toString())

function ImmutablePoint3D (x, y, z) {
	this.getX = function () {
		return x;
	}
	this.getY = function () {
		return y;
	}
	this.getZ = function () {
		return z;
	}
	this.move = function(dx, dy, dz) {
		newX = x + dx;
		newY =  y + dy;
		newZ = z + dz;

		return new ImmutablePoint3D(newX, newY, newZ);
	}
}

ImmutablePoint3D.prototype.toString = MutablePoint3d.prototype.toString;

var p2 = new ImmutablePoint3D(0, 0, 0);
var result = p2.move(0, 0, -1);
console.log(p2.toString());
console.log(result.toString());