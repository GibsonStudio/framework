
var e2b = {};
e2b.direction = 0;
e2b.min = 32;
e2b.max = -625;



$(document).ready(function () {

	//set sliders
	document.sliders.direction.value = e2b.direction;
	direction_slider(e2b.direction);

	draw_e2b();

});



function draw_e2b()
{

	var range = Math.abs(e2b.max - e2b.min);
	var dir = limit_direction(e2b.direction);
	var left = e2b.min - (((360 - dir) / 360) * range);
	$('#e2b_dial').css({'left': left});

}



function limit_direction (dir)
{
	var dir = dir % 360;
	if (dir < 0) { dir += 360; }
	return dir;
}






/* ******** sliders ******** */

function direction_slider (val)
{
	$('#direction_value').html('<b>Direction:</b> ' + parseInt(val) + '&deg;');
	e2b.direction = val * 1.0;
	draw_e2b();
}
