

var increase_pressed;
var decrease_pressed;
var ang;
var ang_inc;
var ang_min;
var ang_max;
var line_length;
var ox;
var oy;
var line_color;
var target_ang;
var angle_padding;
var required_accuracy;

function increase_button_pressed ()
{
	increase_pressed = true;
}


function decrease_button_pressed ()
{
	decrease_pressed = true;
}


function mouse_release ()
{
	increase_pressed = false;
	decrease_pressed = false;
	
}


function ini ()
{

	increase_pressed = false;
	decrease_pressed = false;
	ang = 0;
	ang_inc = 1;
	ang_min = 0;
	ang_max = 180;
	line_length = 200;
	ox = 250;
	oy = 234;
	line_color = 'rgba(63, 165, 53, 1)';
	target_ang = 45;
	angle_padding = 10;
	required_accuracy = 4;
	
	//mouse events
	document.getElementById('increase_button').addEventListener('mousedown', increase_button_pressed);
	document.getElementById('decrease_button').addEventListener('mousedown', decrease_button_pressed);
	addEventListener('mouseup', mouse_release);
	
	//touch events
	document.getElementById('increase_button').addEventListener('touchstart', function (e) { increase_button_pressed(); });
	document.getElementById('decrease_button').addEventListener('touchstart', function (e) { decrease_button_pressed(); });
	document.body.addEventListener('touchend', function (e) { mouse_release(); });	
	
	ask_question();
	window.requestAnimationFrame(animate);
	
}




function animate ()
{

	if (increase_pressed == true) {
		
		ang = ang += ang_inc;
		if ( ang > ang_max ) { ang = ang_max; }
		
	}
	
	if (decrease_pressed == true) {

		ang -= ang_inc;
		if ( ang < ang_min ) { ang = ang_min; }
		
	}
	

	clear_canvas();	
	var rads = (ang / 180.0) * Math.PI;
	
	//draw arc
	colour = 'rgba(255, 236, 150, 0.5)';
	outline = 'rgba(50, 50, 50, 0.5)';
	draw_arc (ox, oy, 30, 0, -ang, { strokeStyle: outline, fillStyle: colour, closePath: true, counterclockwise: true })
	
	//draw line
	var dx = line_length * Math.cos(rads);
	var dy = line_length * Math.sin(rads);
	
	draw_line(ox, oy, ox + dx, oy - dy, { strokeStyle: line_color, lineWidth: 2, lineCap: 'round' });
	
	
	//call next frame
	window.requestAnimationFrame(animate);
	
}




function ask_question ()
{
	
	var a = angle_padding + ((ang_max - angle_padding - ang_min - angle_padding) * Math.random());
	target_ang = Math.round(a);
	
	var t = 'Make an angle of ' + target_ang + '&deg;';
	$('#question').html(t);
	$('#output').html('');

}





function submit ()
{

	var t = '';
	
	if (ang == target_ang)
	{
	
		//spot on
		t = '<b>Spot on!</b>';
		
	}
	else if (Math.abs(ang - target_ang) <= required_accuracy)
	{
	
		//close enough
		t = '<b>Correct!</b> You created an angle of ' + ang + '&deg;, which is close enough.';
	}
	else
	{
	
		//too far off
		t = 'You have created an angle of ' + ang + '&deg. Try and get closer to the target angle of ' + target_ang + '&deg;';
		
	}

	$('#output').html(t);
	
}














