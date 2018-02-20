
//mouse
var mouse_x = 0;
var mouse_y = 0;

//face
var rotate_center = false;
var center_ang = 0;
var rotation_offset = 0;
var center_ang_origin = 0;

//slide
var move_slide = false;
var slide_y = 0;
var slide_y_offset = 0;
var slide_y_min = -800;
var slide_y_max = 400;

//cross
var move_cross = false;
var cross_offset_x = 0;
var cross_offset_y = 0;
var cross_x = 0;
var cross_y = 0;
var cross_ang = 0;
var cross_distance_from_origin = 120;
var cross_visible = false;
var cross_position_ang = 0;




function ini_events ()
{

	//ini vars
	cross_x = parseInt($('#cross').css('left'), 10) - ($('#my_container').width() / 2) + ($('#cross').width() / 2);
	cross_y = parseInt($('#cross').css('top'), 10) - ($('#my_container').height() / 2) + ($('#cross').height() / 2);
	cross_ang = get_angle_between(0, 0, cross_x, cross_y);
	cross_position_ang = cross_ang;
	cross_distance_from_origin = Math.sqrt( Math.pow(cross_x, 2) + Math.pow(cross_y, 2) );
	cross_offset_x = $('#cross').width() / 2;
	cross_offset_y = $('#cross').height() / 2;
	cross_visible = false;
	$('#cross').hide();

	//remove key listener
	window.removeEventListener('keydown', keyboard_shortcuts, false);

	//mouse events
	document.body.addEventListener('mousemove', function (e) { my_move(e); });
	document.addEventListener('mouseup', function (e) { my_stop(e); });
	document.getElementById('center_button').addEventListener('mousedown', function (e) { if (e.button == 0) { start_rotate(e); } });
	document.getElementById('slide_button').addEventListener('mousedown', function (e) { if (e.button == 0) { start_slide(e); } });
	document.getElementById('nc_slide').addEventListener('mousedown', function (e) { if (e.button == 0) { start_slide(e); } });
	document.getElementById('cross').addEventListener('mousedown', function (e) { if (e.button == 0) { start_cross(e); } });

	//touch events
	document.getElementById('center_button').addEventListener('touchmove', function (e) {
		if (e.targetTouches.length == 1) {
			e.preventDefault();
			var touch = e.targetTouches[0];
			my_move(touch);
		}
	});

	document.getElementById('slide_button').addEventListener('touchmove', function (e) {
		if (e.targetTouches.length == 1) {
			e.preventDefault();
			var touch = e.targetTouches[0];
			my_move(touch);
		}
	});

	document.getElementById('cross').addEventListener('touchmove', function (e) {
		if (e.targetTouches.length == 1) {
			e.preventDefault();
			var touch = e.targetTouches[0];
			my_move(touch);
		}
	});

	document.body.addEventListener('touchend', function (e) { my_stop(e); });
	document.getElementById('center_button').addEventListener('touchstart', function (e) { start_rotate(e); });
	document.getElementById('slide_button').addEventListener('touchstart', function (e) { start_slide(e); });
	document.getElementById('nc_slide').addEventListener('touchstart', function (e) { start_slide(e); });
	document.getElementById('cross').addEventListener('touchstart', function (e) { start_cross(e); });

}






function set_slide (speed)
{
	var html = '<img src="nc_slide_' + speed + 'speed.svg" />';
	$('#nc_slide').html(html);
}






function my_move (e)
{

	mouse_x = e.pageX - $('#my_container').offset().left - ($('#my_container').width() / 2);
	mouse_y = e.pageY - $('#my_container').offset().top - ($('#my_container').height() / 2);

	var ang = get_angle_between(0, 0, mouse_x, mouse_y);

	if (rotate_center) {

		//rotate center
		center_ang = ang - rotation_offset;
		$('#nc_back_center').rotate(center_ang);

		//'rotate' cross
		var ang_diff = center_ang - center_ang_origin;
		cross_position_ang = cross_ang + ang_diff;
		position_cross(cross_position_ang);

	}


	if (move_slide) {

		var y_pos = mouse_y - slide_y_offset;

		//keep within limits
		y_pos = y_pos < slide_y_min ? slide_y_min : y_pos;
		y_pos = y_pos > slide_y_max ? slide_y_max : y_pos;

		$('#nc_slide').css({top: y_pos});

	}


	if (move_cross) {
		cross_x = mouse_x - cross_offset_x + ($('#cross').width() / 2);
		cross_y = mouse_y - cross_offset_y + ($('#cross').height() / 2);
		cross_ang = get_angle_between(0, 0, cross_x, cross_y);
		cross_position_ang = cross_ang;
		cross_distance_from_origin = Math.sqrt( Math.pow(cross_x, 2) + Math.pow(cross_y, 2) );
		draw_cross(cross_x, cross_y);
	}

}





function position_cross (ang)
{
	ang = ang * (Math.PI / 180);
	cross_x = Math.sin(ang) * cross_distance_from_origin;
	cross_y = Math.cos(ang) * -cross_distance_from_origin;
	draw_cross(cross_x, cross_y);
}




function toggle_cross()
{

	if (cross_visible) {
		$('#cross').hide();
		cross_visible = false;
	} else {
		$('#cross').show();
		cross_visible = true;
	}

}





function draw_cross (x, y)
{
	var xx = x + ($('#my_container').width() / 2) - ($('#cross').width() / 2);
	var yy = y + ($('#my_container').width() / 2) - ($('#cross').height() / 2);
	$('#cross').css({ left: xx, top: yy });
}




function my_stop (e)
{
	rotate_center = false;
	move_slide = false;
	move_cross = false;
	cross_ang = cross_position_ang;
}




function start_cross (e)
{

	e.preventDefault();

	eX = e.pageX || e.touches[0].pageX;
	eY = e.pageY || e.touches[0].pageY;

	if (e.touches) {
		cross_offset_x = 80;
		cross_offset_y = 80;
	}

	//cross_offset_x = eX - $('#cross').offset().left;
	//cross_offset_y = eY - $('#cross').offset().top;

	move_cross = true;

}





function start_rotate (e)
{

	e.preventDefault();

	eX = e.pageX || e.touches[0].pageX;
	eY = e.pageY || e.touches[0].pageY;

	mouse_x = eX - $('#my_container').offset().left - ($('#my_container').width() / 2);
	mouse_y = eY - $('#my_container').offset().top - ($('#my_container').height() / 2);

	center_ang_origin = center_ang;
	rotation_offset = get_angle_between(0, 0, mouse_x, mouse_y) - center_ang;
	rotate_center = true;

}



function start_slide (e)
{

	e.preventDefault();

	eY = e.pageY || e.touches[0].pageY;
	mouse_y = eY - $('#my_container').offset().top - ($('#my_container').height() / 2);

	slide_y_offset = mouse_y - parseInt($('#nc_slide').css('top'), 10);
	move_slide = true;

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
