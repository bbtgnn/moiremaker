// FUNCTIONS

function gline(pt0, pt1) {
	var p = new GPath();
	p.move_to(pt0);
	p.line_to(pt1);
	return p;
}