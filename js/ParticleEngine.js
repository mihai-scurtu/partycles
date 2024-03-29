function ParticleEngine(canvas) {
	var $this = this;

	var _time;
	var _frameTimes = [];
	
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');
	this.particles = [];
	this.exit = false;
	this.targetFPS = 60;
	this.delta;
	// this.scale = 3;

	this.addParticle = function(x, y, color) {
		$this.particles.push(new Particle(x, y, color));
	}

	this.removeParticle = function(p) {
		for(var i = 0; i < $this.particles.length; i++) {
			var q = this.particles[i];

			if(p == q) {
				$this.particles.splice(i, 1);
				delete q;
			}
		}
		
	}

	this.drawParticles = function() {
		if(!$this.particles.length) return;

		for(var i = 0; i < $this.particles.length; i++) {
			var p = $this.particles[i];
			
			p.draw($this.ctx);			
		}
	}

	this.loop = function(callback) {
		if($this.exit) return 1;

		if(!_time) {
			_time = (new Date()).getTime();
		}
		
		$this.ctx.clearRect(0, 0, ParticleEngine.const.SCALE * ParticleEngine.const.MAX_X, ParticleEngine.const.SCALE * ParticleEngine.const.MAX_Y);

		if(callback !== undefined) {
			callback();
		}

		var newTime = (new Date()).getTime();
		var fps;

		$this.delta = newTime - _time;
		// console.log($this.delta);

		if(_frameTimes.length = ParticleEngine.const.FRAME_TIMES_COUNT) {
			_frameTimes.shift();
		}

		_frameTimes.push($this.delta);

		fps = $this.getFPS();

		$this.ctx.font = '22px Courier';
		$this.ctx.fillStyle = '#000000';
		$this.ctx.fillText(Math.floor(fps), 25, 25);

		_time = newTime;
		setTimeout(function() {$this.loop(callback)}, _frameTimeout());
	}

	this.avgFrameTime = function() {
		var avg = 0;

		if(!_frameTimes || !_frameTimes.length) return 1;

		for(var i = 0; i < _frameTimes.length; i++) {
			avg += _frameTimes[i];
		}

		return avg / _frameTimes.length;
	}

	this.getFPS = function() {
		return 1000 / $this.avgFrameTime();
	}

	var _frameTimeout = function() {
		return Math.max(1, 2 * Math.floor(1000 / $this.targetFPS) - $this.delta);
	}
}

ParticleEngine.randomColor = function() {
	var r, g, b;

	r = Math.floor(Math.random() * 20) * 10;
	g = Math.floor(Math.random() * 20) * 10;
	b = Math.floor(Math.random() * 20) * 10;

	return '#' + (r < 16 ? '0' : '') + r.toString(16)
		+ (g < 16 ? '0' : '') + g.toString(16)
		+ (b < 16 ? '0' : '') + b.toString(16);
}

ParticleEngine.const = {
	MAX_X: 200,
	MAX_Y: 200,
	SCALE: 4,
	FRAME_TIMES_COUNT: 20,
}