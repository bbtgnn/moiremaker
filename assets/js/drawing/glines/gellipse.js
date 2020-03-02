// FUNCTIONS

function arc_to(path, pt0, pt1, sqr=.56) {
	var ptM;
	if ( (pt0.x-pt1.x) / (pt0.y-pt1.y) < 0 ) {
		ptM = createVector(pt1.x, pt0.y);
	}
	else {
		ptM = createVector(pt0.x, pt1.y);
	}
	var pt0C = interpolate_points(pt0, ptM, sqr);
	var pt1C = interpolate_points(pt1, ptM, sqr);
	path.curve_to(pt0C, pt1C, pt1);
}



function gellipse(ptC, dh, dv, sqr=.56) {
	// Points
	var pt0 = createVector(ptC.x       , ptC.y + dv/2);
	var pt1 = createVector(ptC.x + dh/2, ptC.y       );
	var pt2 = createVector(ptC.x       , ptC.y - dv/2);
	var pt3 = createVector(ptC.x - dh/2, ptC.y       );
	// Drawing
	var p = new GPath();
	p.move_to(pt0);
	arc_to(p, pt0, pt1, sqr=sqr);
	arc_to(p, pt1, pt2, sqr=sqr);
	arc_to(p, pt2, pt3, sqr=sqr);
	arc_to(p, pt3, pt0, sqr=sqr);
	return p;
}