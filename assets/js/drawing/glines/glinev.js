// FUNCTIONS

function glinev(ptC, hgt) {
	// Points
	var pt0 = createVector(ptC.x, ptC.y - hgt/2);
	var pt1 = createVector(ptC.x, ptC.y + hgt/2);
	// Drawing
	var p = new GPath();
	p.move_to(pt0);
	p.line_to(pt1);
	return p;
}