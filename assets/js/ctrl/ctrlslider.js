class CtrlSlider extends CtrlBase {

	constructor(name, min, max, {step=1, label, dflt=min} = {} ) {
		super(name, {label});
		this.HTML.addClass("slider");
		this.min = min;
		this.max = max;
		this.step = step;
		this.dflt = dflt;
		this._HTMLobject();
	}

	_HTMLobject() {

		this._add_label();
		var container = this._add_container();

		// Text blueprint
		var value = $("<p/>");
		value.addClass("value");
		value.text(this.dflt);
		container.append(value);


		// Slider container
		var slider_container = $("<div>");
		slider_container.addClass("slider_container");
		container.append(slider_container);

		// Slider blueprint
		var slider = $("<input/>");
		slider.attr("type", "range");
		slider.attr("min", this.min);
		slider.attr("max", this.max);
		slider.attr("value", this.dflt);
		slider.attr("step", this.step);
		slider_container.append(slider);

		slider.on("input", function(event) {
			// Updating text
			var container = $(this).parent().parent()
			var value = container.children(".value");
			value.text(this.value);
		});

		this._rename_all();
	}

	get_value() {
		var selector = "input" + "."+this.name;
		return Number($(selector)[0].value);
	}

	get_value_normalized() {
		var selector = "input" + "."+this.name;
		var value = Number($(selector)[0].value);
		return (value - this.min) / (this.max - this.min);
	}

}