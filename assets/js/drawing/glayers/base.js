// CLASSES

class Box {

	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.c = createVector(x,y);
	}

}



class GLayer {

	constructor(box, ang, frq) {
		this.box = box;
		this.ang = ang;
		this.frq = frq;
		this.paths = [];
	}

}



class GLayerTranslate extends GLayer {

	constructor(box, ang, frq) {
		super(box, ang, frq);
		this.centers_x = [];
		this._calc_centers_x();
	}

	_calc_centers_x() {
		for (var x=0; x<this.box.w/2; x+=this.frq) {
			this.centers_x.push(x);
		}
		for (var x=-this.frq; x>-this.box.w/2; x-=this.frq) {
			this.centers_x.push(x);
		}
	}

}