// FUNCTIONS

function gzigzag(ptC, hgt, div, amp) {
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
		p.line_to(pt1);
		pt0 = pt1;
	}
	return p;
}