function random_choice(list) {
	var i = Math.floor(Math.random() * list.length);
	return list[i];
}

function random_range_f(f1, f2) {
	return f1 + Math.random() * (f2-f1);
}

function random_range_lf(list) {
	return random_range_f(list[0], list[1]);
}

function random_range_i(i1, i2) {
	return i1 + Math.floor( Math.random() * (i2-i1+1) );
}

function random_range_li(list) {
	return random_range_i(list[0], list[1]);
}

function variate_f(v, f) {
	return v + random_range_f(-f, f) * v;
}

function variate_i(v, i) {
	var val = Math.abs(v + random_range_i(-i, i));
	if (val <= 0) {
		return 0;
	}
	else {
		return val;
	}
}