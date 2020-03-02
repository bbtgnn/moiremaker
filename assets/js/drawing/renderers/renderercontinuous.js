// CLASSES

class PathRendererContinuous {

	constructor() {
	}

	render(path) {
		var repr_cont = path.get_repr_continuous();
		beginShape();
		vertex(repr_cont[0][0].x, repr_cont[0][0].y);
		for (var i=1; i<repr_cont.length; i++) {
			// Getting segment
			var s = repr_cont[i];
			if (s.length == 1) {
				vertex(s[0].x, s[0].y);
			}
			else if (s.length == 3) {
				bezierVertex(s[0].x, s[0].y, s[1].x, s[1].y, s[2].x, s[2].y);
			}
			else {
				print("Malformed segment", s);
			}
		}
		endShape();
	}
}



class LayerRendererContinuous {

	constructor( {} = {} ) {
	}

	render(layer) {
		var rndr = new PathRendererContinuous();
		push();
		translate(layer.box.x, layer.box.y);
		rotate(radians(layer.ang));
		for (var i=0; i<layer.paths.length; i++) {
			rndr.render(layer.paths[i]);
		}
		pop();
	}

}