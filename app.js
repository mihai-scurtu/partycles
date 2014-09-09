function App(canvas) {
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
		
		$this.ctx.clearRect(0, 0, App.const.SCALE * App.const.MAX_X, App.const.SCALE * App.const.MAX_Y);

		if(callback !== undefined) {
			callback();
		}

		$this.drawParticles();

		var newTime = (new Date()).getTime();
		var fps;

		$this.delta = newTime - _time;
		// console.log($this.delta);

		if(_frameTimes.length = App.const.FRAME_TIMES_COUNT) {
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

App.randomColor = function() {
	var r, g, b;

	r = Math.floor(Math.random() * 20) * 10;
	g = Math.floor(Math.random() * 20) * 10;
	b = Math.floor(Math.random() * 20) * 10;

	return '#' + (r < 16 ? '0' : '') + r.toString(16)
		+ (g < 16 ? '0' : '') + g.toString(16)
		+ (b < 16 ? '0' : '') + b.toString(16);
}

App.const = {
	MAX_X: 800,
	MAX_Y: 800,
	SCALE: 3,
	FRAME_TIMES_COUNT: 20,
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
