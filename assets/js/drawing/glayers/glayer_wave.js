// CLASSES

class GLayerWave extends GLayerTranslate {

	constructor(box, ang, frq, { div=10, amp=20, sqr=0.56 } = {} ) {
		super(box, ang, frq);
		this.div = div;
		this.amp = amp;
		this.sqr = sqr;
		this._add_paths();
	}

	_add_paths() {
		for (var i=0; i<this.centers_x.length; i++) {
			this.paths.push(gwave(createVector(this.centers_x[i],0), this.box.h, this.div, this.amp, this.sqr));
		}
	}
}