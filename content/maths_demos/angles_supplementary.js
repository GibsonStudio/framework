
var canvas = null;
var context = null;
//var mouse_x;
//var mouse_y;
var active = false;
var knob_size = 50;
var line_length = 170;
var ox = 250;
var oy = 243;

function ini_vars ()
{

	canvas = document.getElementById('my_canvas');
	context = canvas.getContext('2d');
	
	draw_angle(90);
	
	//mouse events
	document.getElementById('knob').addEventListener('mousedown', function (e) { start_move(e); });
	document.body.addEventListener('mouseup', function (e) { stop_move(e); });
	document.body.addEventListener('mousemove', function (e) { move_me(e); });
	
	//touch events
	document.getElementById('knob').addEventListener('touchmove', function (e) {
		
		e.preventDefault();
		
		if (e.targetTouches.length == 1) {
			var touch = e.touches[0];
			move_me(touch);
		} 
		
	});
	
	document.getElementById('knob').addEventListener('touchstart', function (e) { start_move(e); } );
	document.body.addEventListener('touchend', function (e) { stop_move(e); });	

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
	
	if (!active) return false;
	
	clear_canvas();
		
	var offset = $("#my_container").offset();
	var mouse_x = e.pageX - offset.left;
	var mouse_y = e.pageY - offset.top;
	
	//get angle
	var mx = mouse_x - ox;
	var my = oy - mouse_y;
	var a = get_angle_between(0, 0, mx, my);
	a = 360 - a - 270;

	//limit angle
	if ( a < 0 ) { a += 360; }
	if ( a < 0 || a > 270 ) { a = 0; }
	if ( a > 180 && a <= 270 ) { a = 180; }
		
	draw_angle(a);
		
	
}





function draw_angle (a)
{
		
		//draw arc left
		colour = 'rgba(228, 15, 24, 0.2)';
		outline = 'rgba(228, 15, 24, 1)';
		draw_arc (ox, oy, 120, -a, 180, { strokeStyle: outline, fillStyle: colour, closePath: true, counterclockwise: true })
	
		//draw arc right
		colour = 'rgba(62, 72, 153, 0.3)';
		outline = 'rgba(62, 72, 153, 1)';
		draw_arc (ox, oy, 120, 0, -a, { strokeStyle: outline, fillStyle: colour, closePath: true, counterclockwise: true })
	
		//position knob
		var rads = (-a / 180) * Math.PI;
		kx = ox + (line_length * Math.cos(rads));
		ky = oy + (line_length * Math.sin(rads));			
		$('#knob').css({ left: kx - (knob_size / 2), top: ky - (knob_size / 2) });
		
		
		//draw line
		colour = 'rgba(63, 165, 53, 1)';
		draw_line(ox, oy, kx, ky, { strokeStyle: colour, lineWidth: 4, lineCap: 'round' });

		//show angle as text
		var ang = Math.floor(a);
		if ( ang < 0 ) { ang += 360; }
		var html = ang + '&deg;';
		$('#angle_right').html(html);
		
		var html = (180 - ang) + '&deg;';
		$('#angle_left').html(html);
		
		
		if (ang == 90) {
			$('#right').show();
		}
		
		if (ang < 90 && ang > 0) {
			$('#acute').show();
		}
		
		if (ang > 90 && ang < 180) {
			$('#obtuse').show();
		}
		
		if (ang >180 && ang < 360) {
			$('#reflex').show();
		}
		
}






function update_mouse (e)
{
	
	var offset = $("#my_container").offset();
	mouse_x = e.pageX - offset.left;
	mouse_y = e.pageY - offset.top;
	
}






function get_angle_between (x1, y1, x2, y2)
{

	var x = x2 - x1;
	var y = y2 - y1;
	
	//stop divide by zero error
	if (y == 0) { y = 0.0000000001; }
	
	var a = Math.atan( x / y );
	a = a * (180 / Math.PI);
	
	if (y < 0) {
		a = a + 180;
	}
	
	return a;
	
}







