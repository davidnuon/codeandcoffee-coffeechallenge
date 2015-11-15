;(function  (window, document) {

	function renderPixel(ctx, unit, x, y, color) {
		var rx = (x * (unit.unit_width - 2) );
		var ry = (y * unit.unit_height);

		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.rect(rx, ry, unit.unit_width, unit.unit_height);
		ctx.fill();	
		ctx.stroke();	
	}

	function rgb(r,g,b) {
		this.r = r;
		this.g = g;
		this.b = b;
	}


	window.render = function render() {
		var canvas = document.getElementById('canvas');
		var ctx    = canvas.getContext('2d');
		var ascii  = ''; 

		// Cutting up the character
		ascii = document.getElementById('text')
			.value
			.split('\n')
			.map(function(line) {
				return line.split('');
			});


		// Getting the image dimensions
		var IMAGE_WIDTH = ascii
			.map(function(e) { 
				return e.length;
			})
			.reduce(function(a, b) {
				 return Math.max(a, b) 
			}, 0);

		var IMAGE_HEIGHT = ascii.length;

		// The "empty space"
		var EMPTY_PIXEL = ' ';

		// Pixel size for one of our characters
		var unitPixel = {
			unit_width: Math.ceil(canvas.width / IMAGE_WIDTH),
			unit_height: Math.floor(canvas.height / IMAGE_HEIGHT)
		};

		// Drawing the image
		for(var iy = 0; iy < IMAGE_HEIGHT; iy++) {
			var drawing = true;
			var ix = 0;
			for(var ix = 0; ix < ascii[iy].length; ix++) {
				var current_pixel = ascii[iy][ix];
				if(current_pixel != EMPTY_PIXEL) {
					renderPixel(ctx, unitPixel, ix, iy, '');
				}
				ix++;
				drawing = (ix < ascii[iy].length);
			}
		}
		window.char = ascii
			.reduce(function(a,b) {
				return a.concat(b);
			}, [])

	}

	window.onload = render;
}(window, document)); 