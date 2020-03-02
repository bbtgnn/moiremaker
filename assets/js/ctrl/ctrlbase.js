class CtrlBase {

	constructor(name, { label } = {} ) {
		this.name = name;
		this.label = label;

		this.HTML = $("<div/>");
		this.HTML.addClass("ctrl");
		this.HTML.addClass(this.name);
	}

	_add_label() {
		if (this.label != undefined) {
			var ctrl_label = $("<p/>");
			ctrl_label.addClass("ctrl_label");
			ctrl_label.text(this.label);
			this.HTML.append(ctrl_label);
			return ctrl_label;
		}
	}

	_add_container() {
		var ctrl_container = $("<div/>");
		ctrl_container.addClass("ctrl_container");
		this.HTML.append(ctrl_container);
		return ctrl_container;
	}

	_rename_all() {
		this.HTML.find("*").addClass(this.name);
	}

}
