function Force(x, y) {
	this.x = x;
	this.y = y;

	this.applyTo = function(object, delta) {
		object.x += this.x * delta;
		object.y += this.y * delta;
	}	
}

Force.random = function(amplitude) {
	var x = Math.random() * amplitude - amplitude / 2;
  var y = Math.random() * amplitude - amplitude / 2;

  return new Force(x, y);
}