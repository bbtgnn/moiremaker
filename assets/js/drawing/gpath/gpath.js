// CLASSES

// --- GPATH --- //

class GPath {

	constructor() {
		this.segments = [];
	}

	// Util

	_get_last_point() {
		return last(last(this.segments).points);
	}

	_get_first_point() {
		return this.segments[0].points[0];
	}

	is_closed() {
		if (this._get_first_point() == this._get_last_point()) {
			return true;
		}
		else {
			return false;
		}
	}

	// Adding segments

	move_to(pt0) {
		this.segments.push(new GSegmentBase(this, [pt0]));
	}

	line_to(pt1) {
		this.segments.push(new GSegmentLine(this, [pt1]))
	}

	curve_to(pt0C, pt1C, pt1) {
		this.segments.push(new GSegmentCurve(this, [pt0C, pt1C, pt1]))
	}

	// Representations

	get_repr_continuous() {
		var repr_continuous = [];
		for (var i=0; i<this.segments.length; i++) {
			repr_continuous.push(this.segments[i].points);
		}
		return repr_continuous;
	}

	get_repr_discrete(step) {
		var start = 0;
		var repr_discrete = [];
		for (var i=1; i<this.segments.length; i++) {
			var [points, end] = this.segments[i].get_repr_discrete(step, start);
			repr_discrete.push(...points);
			start = end;
		}
		return repr_discrete;
	}

}



// --- GSEGMENT --- //

class GSegmentBase {

	constructor(path, points) {
		this.path = path;
		this.points = points;
	}

}



class GSegment extends GSegmentBase {
	
	constructor(path, points) {
		super(path, points);
	}

	get_start_point() {
		var index_previous_segment = this.path.segments.indexOf(this) - 1;
		return last(this.path.segments[index_previous_segment].points);
	}

}



class GSegmentLine extends GSegment {

	constructor(path, points) {
		super(path, points);
	}

	get_repr_discrete(step, start=0) {
		// Getting unit vector
		var pt0 = this.get_start_point();
		var pt1 = this.points[0];
		var vec_one = p5.Vector.sub(pt1, pt0).normalize();
		// Calculating start point
		var ptS = p5.Vector.mult(vec_one, start).add(pt0);
		// Calculating distance to run
		var dst = p5.Vector.sub(pt1, ptS).mag();
		// Calculating points
		var repr_discrete = [];
		var points_num = floor(dst/step)+1;
		for (var i=0; i<points_num; i++) {
			repr_discrete.push(ptS.copy());
			ptS.add( p5.Vector.mult(vec_one, step) );
		}
		var end = p5.Vector.sub(pt1, ptS).mag();
		return [repr_discrete, end];
	}

}



class GSegmentCurve extends GSegment {

	constructor(path, points) {
		super(path, points)
		this.precision = 200;
	}

	_get_point_at_t(t) {
		var start = this.get_start_point();
		var bt0 = p5.Vector.mult( start         ,     pow((1-t),3)            );
		var bt1 = p5.Vector.mult( this.points[0], 3 * pow((1-t),2) *     t    );
		var bt2 = p5.Vector.mult( this.points[1], 3 *     (1-t)    * pow(t,2) );
		var bt3 = p5.Vector.mult( this.points[2],                    pow(t,3) );
		var ptT = bt0.add(bt1).add(bt2).add(bt3);
		return ptT;
	}

	get_repr_discrete(step, start=0) {
		var repr_discrete = [];
		// Setting start parameters
		var ptS = this.get_start_point();
		var dst = start;
		for (var i=0; i<=this.precision; i++) {
			var t = 1 / this.precision * i;
			var ptT = this._get_point_at_t(t);
			if (distance_between_points(ptS, ptT) >= dst) {
				repr_discrete.push(ptT);
				ptS = ptT;
				dst = step;
			}
		}
		var end = distance_between_points(ptS, last(this.points));
		return [repr_discrete, end];
	}

}