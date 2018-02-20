

var plunger_offset = 100;
var plunger_min = 40;
var plunger_max = 196;
var pressure = 0;
var constant = 20;
var cross_sectional_area = 1;
var factor = 0.02;
var pressure_max= 50;
var active = false;

function ini_scene ()
{

	//set ini values on screen
	
	//calculate pressure
	var plunger_height = (plunger_max - plunger_min);
	var volume = (cross_sectional_area * plunger_height * factor) + 0.4;
	pressure = constant / volume;
		
	//rotate needle
	var needle_ang = 260 * (pressure / 50);
	$('#needle').rotate(needle_ang);
			
		
	//mouse events
	document.body.addEventListener('mousemove', function (e) { move_me(e); });
	document.getElementById('plunger').addEventListener('mousedown', function (e) { start_move(e); });
	document.body.addEventListener('mouseup', function (e) { stop_move(e); });
	
	//touch events
	document.getElementById('plunger').addEventListener('touchmove', function (e) {
		if (e.targetTouches.length == 1) {
			e.preventDefault();
			var touch = e.targetTouches[0];
			move_me(touch);
		}
	});
	
	document.body.addEventListener('touchend', function (e) { stop_move(e); });	
	document.getElementById('plunger').addEventListener('touchstart', function (e) { start_move(e); });
	
	
}



function start_move (e)
{
	active = true;
}



function stop_move (e)
{
	active = false;
}



function move_me (e)
{
	
	if (!active) return;
	
	//move plunger
	var y_pos = e.pageY - $('#my_container').offset().top - plunger_offset;		
	y_pos = Math.min(Math.max(parseInt(y_pos), plunger_min), plunger_max);		
	$('#plunger').css({ top: y_pos });
		
	//calculate pressure
	var plunger_height = (plunger_max - y_pos);
	var volume = (cross_sectional_area * plunger_height * factor) + 0.4;
	pressure = constant / volume;
	
	$('#pressure').html(pressure.toFixed(2));
	$('#volume').html(volume.toFixed(2));
		
	//rotate needle
	var needle_ang = 260 * (pressure / 50);
	$('#needle').rotate(needle_ang);
		
}















