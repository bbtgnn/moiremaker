class CtrlSeparator extends CtrlBase {

	constructor({ name = "ctrl_separator", label } = {} ) {
		super(name, {label});
		this.HTML = $("<hr>");
		this.HTML.addClass("input");
		this.HTML.addClass("separator");
		this.HTML.addClass(this.name);
	}

}
