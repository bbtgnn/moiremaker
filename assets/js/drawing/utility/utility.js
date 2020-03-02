// FUNCTIONS

function last(list) {
	return list[list.length-1];
}

function sign(num) {
	if (num>0) {
		return 1;
	}
	else if (num<0) {
		return -1;
	}
	else {
		return 0;
	}
}

function distance_between_points(pt0, pt1) {
	var vec_dst = p5.Vector.sub(pt1, pt0);
	var dst = vec_dst.mag();
	return dst;
}

function interpolate_points(pt0, pt1, s) {
	var ptI = p5.Vector.add( pt0, p5.Vector.sub(pt1, pt0).mult(s) );
	return ptI;
}

function round_to_precision(x, precision) {
    var y = +x + (precision === undefined ? 0.5 : precision/2);
    return y - (y % (precision === undefined ? 1 : +precision));
}