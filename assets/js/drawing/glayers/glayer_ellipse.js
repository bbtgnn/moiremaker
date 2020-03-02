// CLASSES

class GLayerEllipse extends GLayer {

	constructor(box, ang, frq, { sqr=.56 } = {} ) {
		super(box, ang, frq);
		this.sqr = sqr;
		this._add_paths();
	}

	_add_paths() {
		var dh = this.box.w;
		var dv = this.box.h;
		while (dh >= this.frq && dv >= this.frq) {
			this.paths.push(gellipse(createVector(0,0), dh, dv, this.sqr));
			dh -= this.frq;
			dv -= this.frq;
		}
	}

}