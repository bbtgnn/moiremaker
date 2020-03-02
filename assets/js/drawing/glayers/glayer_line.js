// CLASSES

class GLayerLine extends GLayerTranslate {

	constructor(box, ang, frq, {} = {} ) {
		super(box, ang, frq);
		this._add_paths()
	}

	_add_paths() {
		for (var i=0; i<this.centers_x.length; i++) {
			this.paths.push(glinev(createVector(this.centers_x[i],0), this.box.h));
		}
	}
}