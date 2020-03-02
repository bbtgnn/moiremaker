class CtrlSliderRange extends CtrlBase {

	constructor(name, min, max, {step=1, label, dflt=[min, max]} = {}) {
		super(name, {label});
		this.HTML.addClass("sliderrange");
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

		var value_low = value.clone(true);
		value_low.addClass("value_low")
		value_low.text(this.dflt[0]);
		container.append(value_low);

		var value_high = value.clone(true);
		value_high.addClass("value_high")
		value_high.text(this.dflt[1]);
		// Appending later


		// Slider container
		var slider_container = $("<div>");
		slider_container.addClass("slider_container");

		// Slider blueprint
		var slider = $("<input/>");
		slider.attr("type", "range");
		slider.attr("min", this.min);
		slider.attr("max", this.max);
		slider.attr("step", this.step);

		slider.on("input", function(event) {
			// Getting min and max
			var slider_0 = $(this);
			var slider_1 = slider_0.siblings("input");
			var slider_0_val = Number(slider_0[0].value);
			var slider_1_val = Number(slider_1[0].value);
			var low  = Math.min(slider_0_val, slider_1_val);
			var high = Math.max(slider_0_val, slider_1_val);
			// Updating text
			var container = slider_0.parent().parent()
			var value_low = container.children(".value_low");
			value_low.text(low);
			var value_high = container.children(".value_high");
			value_high.text(high);
		})

		var slider_original = slider.clone(true);
		slider_original.addClass("original");
		slider_original.attr("value", this.dflt[0]);
		slider_container.append(slider_original);

		var slider_ghost = slider.clone(true);
		slider_ghost.addClass("ghost");
		slider_ghost.attr("value", this.dflt[1]);
		slider_container.append(slider_ghost);

		container.append(slider_container);

		// Appending now
		container.append(value_high);

		this._rename_all();
	}

	get_value() {
		var selector = "p.value" + "."+this.name;
		var low  = $(selector + ".value_low").text();
		low = Number(low);
		var high = $(selector + ".value_high").text();
		high = Number(high);
		return [low, high];
	}

	get_value_normalized() {
		var selector = "p.value" + "."+this.name;
		var low  = $(selector + ".value_low").text();
		low = Number(low);
		var high = $(selector + ".value_high").text();
		high = Number(high);
		// Normalizing
		low  = (low  - this.min) / (this.max - this.min);
		high = (high - this.min) / (this.max - this.min);
		return [low, high];
	}

}