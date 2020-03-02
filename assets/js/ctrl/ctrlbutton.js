class CtrlButton extends CtrlBase {

	constructor(name, funct, {label}) {
		super(name, {label});
		this.HTML.addClass("button");
		this.funct = funct;
		this._HTMLobject();
	}

	_HTMLobject() {

		var container = this._add_container();

		var button = $("<button type='button'></button>");
		button.text(this.label);
		button.on("click", this.funct)
		container.append(button);

		this._rename_all();
	}

}
