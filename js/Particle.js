function Particle(x, y, color) {
	var $this = this;

	this.x = x;
	this.y = y;
	this.scale = 2;
	this.color = '';

	this.forces = [];

	if(typeof(color) == 'string' && color.match(/^#?[a-fA-F0-9]{6}$/)) {
		this.color = '#' + color.replace('#', '');	
	} else {
		this.color = ParticleEngine.randomColor();
	};

	this.draw = function(ctx) {
		var x = $this.x * ParticleEngine.const.SCALE;
		var y = $this.y * ParticleEngine.const.SCALE;
		var radius = $this.scale;

		ctx.fillStyle = $this.color; 
		ctx.strokeStyle = $this.color;
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2*Math.PI);
		ctx.closePath();
		ctx.fill();
	}

	this.addForce = function(force) {
		$this.forces.push(force);
	}

	this.applyForce = function(delta) {
		var force = $this.force();

		$this.x += force.x * delta;
		$this.y += force.y * delta; 
		
	}

	this.force = function() {
		var f = new Force(0, 0);
		if($this.forces.length) {
			for(var i = 0; i < $this.forces.length; i++) {
				var force = $this.forces[i];

				f.x += force.x;
				f.y += force.y; 
			}
		}

		return f;
	}
}
