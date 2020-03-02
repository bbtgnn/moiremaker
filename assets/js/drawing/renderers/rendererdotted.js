// CLASSES

class PathRendererDotted {

	constructor(step, diameter) {
		this.step = step;
		this.diameter = diameter;
	}

	render(path) {
		var repr_disc = path.get_repr_discrete(this.step);
		for (var i=0; i<repr_disc.length; i++) {
			var p = repr_disc[i];
			ellipse(p.x, p.y, this.diameter, this.diameter);
		}
	}
}



class LayerRendererDotted {

	constructor( { step=10, diameter=4} = {}) {
		this.step = step;
		this.diameter = diameter;
	}

	render(layer) {
		var rndr = new PathRendererDotted(this.step, this.diameter);
		push();
		translate(layer.box.x, layer.box.y);
		rotate(radians(layer.ang));
		for (var i=0; i<layer.paths.length; i++) {
			rndr.render(layer.paths[i]);
		}
		pop();
	}
}