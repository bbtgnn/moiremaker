// CLASSES

class GLayerRadiuses extends GLayer {

	constructor(box, ang, frq, { lng=.3 } = {} ) {
		super(box, ang, frq);
		this.lng = lng;
		this._add_paths();
	}

	_add_paths() {

		// Ellipse radiuses
		var a = this.box.w;
		var b = this.box.h;

		// Using Ramanujan approssimation
		var h = pow(a-b,2) / pow(a+b,2);
		var p = PI * (a+b) * (1 + 3 * h / (10 + sqrt(4 - 3*h)) );

		// Iterating over number of radiuses
		var num = floor(p / this.frq / 2);
		for (var i=0; i<num; i++) {
	
			// Getting polar coordinates
			var f = TWO_PI / num * i;
			var r = a/2 * b/2 / sqrt( pow(a/2*sin(f),2) + pow(b/2*cos(f),2) );

			// Getting cartesian coordinates
			var x = r * cos(f);
			var y = r * sin(f);
			var pt0 = createVector(x,y);

			// Getting vector to center
			var vec_cnt = p5.Vector.sub( createVector(0,0), pt0).mult(1-this.lng);
			// Getting center point
			var pt1 = p5.Vector.add(pt0, vec_cnt);

			this.paths.push(gline(pt0, pt1));
		}
	}

}