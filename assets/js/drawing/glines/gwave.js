// FUNCTIONS

function wave_to(path, pt0, pt1, sqr=.56) {
	var pt0M = createVector(pt0.x, pt1.y);
	var pt1M = createVector(pt1.x, pt0.y);
	var pt0C = interpolate_points(pt0, pt0M, sqr);
	var pt1C = interpolate_points(pt1, pt1M, sqr);
	path.curve_to(pt0C, pt1C, pt1);
}



function gwave(ptC, hgt, div, amp, sqr=.56) {
	var a = amp/2;
	var step = hgt/div;
	var pt0 = createVector(ptC.x + a, ptC.y - hgt/2);
	var p = new GPath();
	p.move_to(pt0);
	for (var i=0; i<div; i++) {
		if (i%2==0) {
			f =  1;
		}
		else {
			f = -1;
		}
		var pt1 = createVector(pt0.x - f*2*a, pt0.y + step);
		wave_to(p, pt0, pt1, sqr=sqr);
		pt0 = pt1;
	}
	return p;
}