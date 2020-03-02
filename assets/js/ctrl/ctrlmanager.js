class CtrlManager {

	constructor() {
		this.ctrls = [];
	}

	add_ctrl(ctrl) {
		this.ctrls.push(ctrl);
	}

	add_ctrls_from_list(list) {
		for (var i=0; i<list.length; i++) {
			this.add_ctrl(list[i]);
		}
	}

	append_ctrls(selector) {
		for (var i=0; i<this.ctrls.length; i++) {
			$(selector).append(this.ctrls[i].HTML);
		}
	}

	get(ctrl_name) {
		for (var i=0; i<this.ctrls.length; i++) {
			if (this.ctrls[i].name == ctrl_name) {
				return this.ctrls[i]
			}
		}
	}

}