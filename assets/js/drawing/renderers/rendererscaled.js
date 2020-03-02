// CLASSES

class PathRendererScaled {

	constructor(step, length, center=createVector(0,0), angle=0) {
		this.step = step;
		this.length = length;
		this.center = center;
		this.angle = angle;
	}

	_transform_points(points) {
		// Storing points in list
		var points_transformed = [];
		// Iterating over points
		for (var i=0; i<points.length; i++) {
			var pt = points[i];
			var ptR = pt.rotate(radians(this.angle));
			var ptT = p5.Vector.add(ptR, this.center);
			points_transformed.push(ptT);
		}
		return points_transformed;
	}

	render(path) {
		// Getting points
		var points = path.get_repr_discrete(this.step);
		points = this._transform_points(points);
		// Util
		var l = this.length/2;
		// Starting point
		var pt0 = points[0];
		beginShape();
		vertex(pt0.x, pt0.y);
		for (var i=1; i<points.length; i++) {
			// Getting point
			var pt1 = points[i];
			// Calculating distance
			var dst = pt1.x - pt0.x;
			var dst_abs = abs(dst);
			var dst_sgn = sign(dst);
			// Calculating connecting points
			var pt0C = createVector( pt0.x + dst_sgn*l , pt0.y );
			var pt1C = createVector( pt1.x - dst_sgn*l , pt1.y );
			// Checking
			if (dst_abs < l) {
				// Pass
			}
			else {
				vertex(pt0C.x, pt0C.y);
				if (dst_abs >= 2*l) {
					vertex(pt1C.x, pt1C.y);
				}
			}
			vertex(pt1.x, pt1.y);
			pt0 = pt1;
		}
		if (path.is_closed()) {
			vertex(points[0].x, points[0].y);
		}
		endShape();
	}

}



class LayerRendererScaled {

	constructor( {step=10, length=4 } = {}) {
		this.step = step;
		this.length = length;
	}

	render(layer) {
		var rndr = new PathRendererScaled(this.step, this.length, layer.box.c, layer.ang);
		for (var i=0; i<layer.paths.length; i++) {
			rndr.render(layer.paths[i]);
		}
	}

}