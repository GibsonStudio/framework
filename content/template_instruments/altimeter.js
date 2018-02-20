
var altimeter = {};
altimeter.altitude = 3000;
altimeter.pressure = 1020;
altimeter.subscale = 1020;



$(document).ready(function () {

	//set sliders
	document.sliders.altitude.value = altimeter.altitude;
	altitude_slider(altimeter.altitude);
	document.sliders.pressure.value = altimeter.pressure;
	pressure_slider(altimeter.pressure);
	document.sliders.subscale.value = altimeter.subscale;
	subscale_slider(altimeter.subscale);

	draw_altimeter();

});



function draw_altimeter()
{

	//calculate indicated_altitude
	var pressure_diff = altimeter.subscale - altimeter.pressure;
	var alt_inc = pressure_diff * 30.0;
	var indicated_altitude = altimeter.altitude + alt_inc;

	//100s needle
	var rot = (indicated_altitude / 1000.0) * 360;
	$('#needle_100').rotate(rot);

	//1000s needle
	rot = (indicated_altitude / 10000.0) * 360;
	$('#needle_1000').rotate(rot);

	//10,000s needle
	rot = (indicated_altitude / 100000.0) * 360;
	$('#needle_10000').rotate(rot);

	//subscale
	var ang = ( (altimeter.subscale - 950) / (100) ) * -300;
	$('#subscale').rotate(ang);

	//rotate knob
	$('#subscale_knob').rotate(ang);

}




/* ******** sliders ******** */

function altitude_slider (val)
{
	$('#altitude_value').html('<b>Altitude:</b> ' + parseInt(val) + ' ft');
	altimeter.altitude = val * 1.0;
	draw_altimeter();
}

function pressure_slider (val)
{
	$('#pressure_value').html('<b>Pressure:</b> ' + parseInt(val) + ' hPa');
	altimeter.pressure = val * 1.0;
	draw_altimeter();
}

function subscale_slider (val)
{
	$('#subscale_value').html('<b>Subscale:</b> ' + parseInt(val) + ' hPa');
	altimeter.subscale = val * 1.0;
	draw_altimeter();
}
