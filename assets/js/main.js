// --- CONSTANTS --- //

var RENDERERS = {
	"Continuous" : LayerRendererContinuous,
	"Dotted" : LayerRendererDotted,
	"Scaled" : LayerRendererScaled
}
var RENDERER;

var LAYERS = [
	GLayerLine,
	GLayerEllipse,
	GLayerRadiuses,
	GLayerWave,
	GLayerZigZag,
]
var LAYERS_CONFIG = [];

var COLORS = [];




// --- INSTRUCTIONS --- //

// Initializing some variables
var canvas_parent_id = "sketch";
var canvas_parent;
var ctrl_manager;


function setup() {

	// Canvas setup
	canvas_parent = $("#"+canvas_parent_id);
	var canvas = createCanvas(canvas_parent.width(), canvas_parent.height());
	canvas.parent(canvas_parent_id);

	noLoop();

	COLORS = [
		color(211, 176,  56),
		color( 48, 145, 120),
		color(  0,  48, 142),
		color(155,  18,  30)
	]

	// Controls setup
	ctrl_manager = new CtrlManager();
	ctrl_manager.add_ctrls_from_list([
		new CtrlDropdown("rnd", Object.keys(RENDERERS), {label:"Renderer"}),
		new CtrlSeparator(),
		new CtrlSlider("rnd_stp", 1, 100, {label:"Dotted, Scaled | Step", dflt:10}),
		new CtrlSeparator(),
		new CtrlSlider("rnd_dmt", 1, 100, {label:"Dotted | Diameter", dflt:2}),
		new CtrlSeparator(),
		new CtrlSlider("rnd_lng", 1, 100, {label:"Scaled | Step length", dflt:5}),
		new CtrlSeparator(),
		new CtrlSeparator(),
		new CtrlSlider("lyr_num", 1, 4, {label:"Number of layers", dflt:3}),
		new CtrlSeparator(),
		new CtrlSeparator(),
		new CtrlSliderRange("frq_rng", 1, 100, {label:"Frequency", dflt:[30,60]}),
		new CtrlSlider("frq_var", 0, 100, {label:"Variation", dflt:5}),
		new CtrlSeparator(),
		new CtrlSliderRange("ang_rng", 0, 360, {label:"Angle"}),
		new CtrlSlider("ang_var", 0, 100, {label:"Variation", dflt:5}),
		new CtrlSeparator(),
		new CtrlSeparator(),
		new CtrlSliderRange("c_x_rng", -50, 50, {label:"Center X", dflt:[-25,25]}),
		new CtrlSlider("c_x_var", 0, 100, {label:"Variation", dflt:5}),
		new CtrlSeparator(),
		new CtrlSliderRange("c_y_rng", -50, 50, {label:"Center Y", dflt:[-25,25]}),
		new CtrlSlider("c_y_var", 0, 100, {label:"Variation", dflt:5}),
		new CtrlSeparator(),
		new CtrlSliderRange("wdt_rng", 200, 300, {label:"Width"}),
		new CtrlSlider("wdt_var", 0, 100, {label:"Variation", dflt:5}),
		new CtrlSeparator(),
		new CtrlSliderRange("hgt_rng", 200, 300, {label:"Height"}),
		new CtrlSlider("hgt_var", 0, 100, {label:"Variation", dflt:5}),
		new CtrlSeparator(),
		new CtrlSeparator(),
		new CtrlSliderRange("div_rng", 1, 50, {label:"Wave, ZigZag | Periods", dflt:[10,20]}),
		new CtrlSlider("div_var", 0, 10, {label:"Variation", dflt:5}),
		new CtrlSeparator(),
		new CtrlSliderRange("amp_rng", 0, 100, {label:"Wave, ZigZag | Amplitude", dflt:[30,60]}),
		new CtrlSlider("amp_var", 0, 100, {label:"Variation", dflt:5}),
		new CtrlSeparator(),
		new CtrlSliderRange("sqr_rng", 0, 1, {label:"Wave, Ellipse | Squaring", dflt:[0.4,0.7], step:0.01}),
		new CtrlSlider("sqr_var", 0, 100, {label:"Variation", dflt:5}),
		new CtrlSeparator(),
		new CtrlSliderRange("lng_rng", 0, 1, {label:"Radiuses | Length", dflt:[0.2,0.3], step:0.01}),
		new CtrlSlider("lng_var", 0, 100, {label:"Variation", dflt:5}),
	]);
	ctrl_manager.append_ctrls("#controls .sliders");

	// Buttons setup
	var btn_manager = new CtrlManager();
	btn_manager.add_ctrls_from_list([
		new CtrlButton("generate", buttonGenerate, {label:"Generate!"} ),
		new CtrlButton("randomize", buttonRandomize, {label:"Randomize all values!"} ),
		new CtrlButton("save", buttonSave, {label:"Save!"} )
	]);
	btn_manager.append_ctrls("#controls .buttons");

}


function draw() {
	background(255);
	strokeWeight(1);
	translate(width/2, height/2);

	for (var i=0; i<LAYERS_CONFIG.length; i++) {
		var c = random_choice(COLORS);
		console.log(RENDERER)
		if (RENDERER == LayerRendererDotted) {
			noStroke();
			fill(LAYERS_CONFIG[i].color);
		}
		else {
			noFill();
			stroke(LAYERS_CONFIG[i].color);
		}
		RENDERER.render(LAYERS_CONFIG[i].layer);
	}
}



function windowResized() {
	// To work, the parent div needs to have the overflow property set as hidden
	resizeCanvas(canvas_parent.width(), canvas_parent.height(), false);
}



// --- Button functions --- //

function buttonSave() {
	saveCanvas();
}


function buttonRandomize() {
	var sliders = $("input[type='range']");
	sliders.each( function(index, element) {
		var min  = Number($(element).attr("min"));
		var max  = Number($(element).attr("max"));
		var step = Number($(element).attr("step"));
		if (Number.isInteger(step)) {
			$(element).attr("value", random_range_i(min, max));
		}
		else {
			$(element).attr("value", random_range_f(min, max));
		}
		$(element).trigger("input");
	});
}


function buttonGenerate() {
	updateConfig();
	redraw();
}


function updateConfig() {
	
	LAYERS_CONFIG = [];

	// Getting values from input
	var rndr     = ctrl_manager.get("rnd").get_value();
	var rndr_stp = ctrl_manager.get("rnd_stp").get_value();
	var rndr_dmt = ctrl_manager.get("rnd_dmt").get_value();
	var rndr_lng = ctrl_manager.get("rnd_lng").get_value();

	var lyr_num = ctrl_manager.get("lyr_num").get_value();

	var c_x_rng = ctrl_manager.get("c_x_rng").get_value();
	var c_x_var = ctrl_manager.get("c_x_var").get_value_normalized();
	var c_y_rng = ctrl_manager.get("c_y_rng").get_value();
	var c_y_var = ctrl_manager.get("c_y_var").get_value_normalized();
	var wdt_rng = ctrl_manager.get("wdt_rng").get_value();
	var wdt_var = ctrl_manager.get("wdt_var").get_value_normalized();
	var hgt_rng = ctrl_manager.get("hgt_rng").get_value();
	var hgt_var = ctrl_manager.get("hgt_var").get_value_normalized();

	var ang_rng = ctrl_manager.get("ang_rng").get_value();
	var ang_var = ctrl_manager.get("ang_var").get_value_normalized();

	var frq_rng = ctrl_manager.get("frq_rng").get_value();
	var frq_var = ctrl_manager.get("frq_var").get_value_normalized();

	var div_rng = ctrl_manager.get("div_rng").get_value();
	var div_var = ctrl_manager.get("div_var").get_value();//
	var amp_rng = ctrl_manager.get("amp_rng").get_value();
	var amp_var = ctrl_manager.get("amp_var").get_value_normalized();
	var sqr_rng = ctrl_manager.get("sqr_rng").get_value();
	var sqr_var = ctrl_manager.get("sqr_var").get_value_normalized();
	var lng_rng = ctrl_manager.get("lng_rng").get_value();
	var lng_var = ctrl_manager.get("lng_var").get_value_normalized();


	// Setting renderer first of all
	RENDERER = new RENDERERS[rndr]({step: rndr_stp, diameter: rndr_dmt, length: rndr_lng});


	// Calculating random values

	var c_x_rnd = random_range_lf(c_x_rng) / 100 * width;
	var c_y_rnd = random_range_lf(c_y_rng) / 100 * height;
	var wdt_rnd = random_range_lf(wdt_rng) / 100 * width;
	var hgt_rnd = random_range_lf(hgt_rng) / 100 * height;

	var ang_rnd = random_range_lf(ang_rng);
	var frq_rnd = random_range_lf(frq_rng);

	var div_rnd = random_range_li(div_rng);
	var amp_rnd = random_range_lf(amp_rng);
	var sqr_rnd = random_range_lf(sqr_rng);
	var lng_rnd = random_range_lf(lng_rng);


	// Creating layer
	for (var i=0; i<lyr_num; i++) {

		var lyr = random_choice(LAYERS);
		
		var c_x_lyr = variate_f(c_x_rnd, c_x_var);
		var c_y_lyr = variate_f(c_y_rnd, c_y_var);
		var wdt_lyr = variate_f(wdt_rnd, wdt_var);
		var hgt_lyr = variate_f(hgt_rnd, hgt_var);

		var box_lyr = new Box(c_x_lyr, c_y_lyr, wdt_lyr, hgt_lyr);
	
		var ang_lyr = variate_f(ang_rnd, ang_var);
		var frq_lyr = variate_f(frq_rnd, frq_var);
	
		var prp_lyr = {
			div : variate_i(div_rnd, div_var),
			amp : variate_f(amp_rnd, amp_var),
			sqr : variate_f(sqr_rnd, sqr_var),
			lng : variate_f(lng_rnd, lng_var)
		}

		LAYERS_CONFIG.push({
			layer : new lyr(box_lyr, ang_lyr, frq_lyr, prp_lyr),
			color : random_choice(COLORS)
		});
	}

}