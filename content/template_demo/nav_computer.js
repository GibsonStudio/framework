
var mouse_x = 0;
var mouse_y = 0;
var rotate_object = '';
var nc_cursor_ang = 0;
var nc_front_center_ang = 0;
var rotation_offset = 0;



function ini_events ()
{

	//mouse events
	document.body.addEventListener('mousemove', function (e) { my_move(e); });
	document.body.addEventListener('mouseup', function (e) { my_stop(e); });	
	document.getElementById('cursor_button').addEventListener('mousedown', function (e) { start_cursor_rotate(e); });
	document.getElementById('front_center_button').addEventListener('mousedown', function (e) { start_face_rotate(e); });
	
	//touch events
	document.getElementById('cursor_button').addEventListener('touchmove', function (e) {
		if (e.targetTouches.length == 1) {
			e.preventDefault();
			var touch = e.targetTouches[0];
			my_move(touch);
		}
	});
	
	document.getElementById('front_center_button').addEventListener('touchmove', function (e) {
		
		e.preventDefault();
		
		if (e.targetTouches.length == 1) {
			var touch = e.touches[0]; 
			my_move(touch);
		} 
		
	});
	
	document.body.addEventListener('touchend', function (e) { my_stop(e); });	
	document.getElementById('cursor_button').addEventListener('touchstart', function (e) { start_cursor_rotate(e); });
	document.getElementById('front_center_button').addEventListener('touchstart', function (e) { start_face_rotate(e); });
	
	//document.getElementById('front_center_button').addEventListener('touchcancel', function (e) {
		//e.preventDefault();
	//);
	
}




function my_move (e)
{
	
	mouse_x = e.pageX - $('#my_container').offset().left - ($('#my_container').width() / 2);
	mouse_y = e.pageY - $('#my_container').offset().top - ($('#my_container').height() / 2);
	
	var ang = get_angle_between(0, 0, mouse_x, mouse_y);
	
	if (rotate_object == 'nc_cursor') {
		nc_cursor_ang = ang - rotation_offset;
		$('#nc_cursor').rotate(nc_cursor_ang);
	}
	
	if (rotate_object == 'nc_front_center') {
		nc_front_center_ang = ang - rotation_offset;
		$('#nc_front_center').rotate(nc_front_center_ang);
	}
	
}




function my_stop ()
{	
	rotate_object = '';	
}




function start_cursor_rotate (e)
{
	
	e.preventDefault();
	
	eX = e.pageX || e.touches[0].pageX;
	eY = e.pageY || e.touches[0].pageY;
	
	mouse_x = eX - $('#my_container').offset().left - ($('#my_container').width() / 2);
	mouse_y = eY - $('#my_container').offset().top - ($('#my_container').height() / 2);
	
	rotation_offset = get_angle_between(0, 0, mouse_x, mouse_y) - nc_cursor_ang;
	rotate_object = 'nc_cursor';
	
}




function start_face_rotate (e)
{

	e.preventDefault();
	
	eX = e.pageX || e.touches[0].pageX;
	eY = e.pageY || e.touches[0].pageY;
	
	mouse_x = eX - $('#my_container').offset().left - ($('#my_container').width() / 2);
	mouse_y = eY - $('#my_container').offset().top - ($('#my_container').height() / 2);

	rotation_offset = get_angle_between(0, 0, mouse_x, mouse_y) - nc_front_center_ang;
	rotate_object = 'nc_front_center';
	
}






function get_angle_between (x1, y1, x2, y2) {
	var x = x2 - x1;
	var y = y1 - y2;	
	//stop divide by zero error
	if (y ==0) {
		y = 0.000000001;
	}	
	var angle = Math.atan(x/y);	
	angle = angle * (180 / Math.PI);	
	if ( x2 > x1 && y2 > y1 ) {
		angle = 180 + angle;
	} else if ( x2 < x1 && y2 > y1 ) {
		angle = 180 + angle;
	} else if ( x2 < x1 && y2 < y1 ) {
		angle = 360 + angle;
	}	
	//keep in the range 0 - 360
	if (angle < 0) {
		angle = angle + 360;
	} else if (angle > 360) {
		angle = angle - 360;
	}	
	return angle;	
}