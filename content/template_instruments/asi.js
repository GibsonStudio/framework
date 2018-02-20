
var asi = {};
asi.airspeed = 40;



$(document).ready(function () {

	//set sliders
	document.sliders.airspeed.value = asi.airspeed;
	airspeed_slider(asi.airspeed);

	draw_asi();

});




function draw_asi ()
{

	//these numbers are 'fiddled' as the scale is not linear after 160 knots

	var rot = (1.992 * asi.airspeed) - 48.66;

	if (asi.airspeed < 40) {

		rot = (asi.airspeed / 40.0) * 31;

	} else if (asi.airspeed > 160) {
		var diff = rot - 270;
		rot = rot - (diff / 4.2);
	}

	$('#asi_needle').rotate(rot);

}






/* ******** sliders ******** */

function airspeed_slider (val)
{
	$('#airspeed_value').html('<b>Airspeed:</b> ' + parseInt(val) + ' kt');
	asi.airspeed = val * 1.0;
	draw_asi();
}
