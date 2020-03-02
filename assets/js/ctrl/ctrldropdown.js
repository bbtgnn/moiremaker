class CtrlDropdown extends CtrlBase {

	constructor(name, options, { label } = {} ) {
		super(name, { label } );
		this.HTML.addClass("dropdown");
		this.options = options;
		this._HTMLobject();
	}

	_HTMLobject() {

		// Adding label and container
		this._add_label();
		var container = this._add_container();

		// Creating select element
		var select = $("<select/>");
		// Looping through options
		for (var i=0; i<this.options.length; i++) {
			var item = this.options[i];
			var option = $("<option/>");
			option.attr("value", item);
			option.text(item);
			select.append(option);
		}

		container.append(select);

		this._rename_all();
	}

	get_value() {
		var selector = "select" + "."+this.name;
		return $(selector)[0].value;
	}

}
