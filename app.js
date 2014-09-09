function App(canvas) {
	var $this = this;
	
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');
	this.particles = [];
	// this.scale = 3;

	this.addParticle = function(x, y, color) {
		$this.particles.push(new Particle(x, y, color));
	}

	this.drawParticles = function() {
		$this.ctx.clearRect(0, 0, App.const.SCALE * App.const.MAX_X, App.const.SCALE * App.const.MAX_Y);

		if(!$this.particles.length) return;

		for(var i = 0; i < $this.particles.length; i++) {
			var p = $this.particles[i];
			
			p.draw($this.ctx);			
		}
	}
}

App.randomColor = function() {
	var r, g, b;

	r = Math.floor(Math.random() * 20) * 10 + 55;
	g = Math.floor(Math.random() * 20) * 10 + 55;
	b = Math.floor(Math.random() * 20) * 10 + 55;

	return '#' + (r < 16 ? '0' : '') + r.toString(16)
		+ (g < 16 ? '0' : '') + g.toString(16)
		+ (b < 16 ? '0' : '') + b.toString(16);
}

App.const = {
	MAX_X: 100,
	MAX_Y: 50,
	SCALE: 3,
}

function Particle(x, y, color) {
	var $this = this;

	this.x = x;
	this.y = y;
	this.scale = 2;
	this.color = '';

	if(typeof(color) == 'string' && color.match(/^#?[a-fA-F0-9]{6}$/)) {
		this.color = '#' + color.replace('#', '');	
	} else {
		this.color = App.randomColor();
	};

	this.draw = function(ctx) {
		ctx.fillStyle = $this.color; 
		ctx.strokeStyle = $this.color;
		ctx.beginPath();
		ctx.arc(
			$this.x * App.const.SCALE,
			$this.y * App.const.SCALE,
			$this.scale,
			0, 2*Math.PI
		);
		ctx.closePath();
		ctx.fill();
	}
}
