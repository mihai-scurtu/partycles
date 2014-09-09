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
		var x = $this.x * App.const.SCALE;
		var y = $this.y * App.const.SCALE;
		var radius = $this.scale;

		ctx.fillStyle = $this.color; 
		ctx.strokeStyle = $this.color;
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2*Math.PI);
		ctx.closePath();
		ctx.fill();
	}
}
