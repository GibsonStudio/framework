

var active_elements = ['angle_A', 'angle_B', 'angle_C'];
var offset_angle = 0;
var ini_rotation = 0;
var objects;
var active = false;
var operation = 'move';
var clicked_element = '';



function ini_scene ()
{
	
	objects = [];
	
	for (index in active_elements) {
	
		var obj_name = active_elements[index];
		var obj = {};
		obj.rotation = 0;
		objects[obj_name] = obj;
		
	}
	
	//button events
	document.getElementById('move_button').addEventListener('click', function (e) { set_move(); } );
	document.getElementById('rotate_button').addEventListener('click', function (e) { set_rotate(); } );
	
	//mouse events	
	document.body.addEventListener('mousemove', function (e) { move_event(e); });
	document.body.addEventListener('mouseup', function (e) { stop_event(e); });
	document.body.addEventListener('mousedown', function (e) { start_event(e); });
	
	//touch events	
	document.body.addEventListener('touchstart', function (e) { start_event(e); });
	document.body.addEventListener('touchend', function (e) { stop_event(e); });

	document.body.addEventListener('touchmove', function (e) {
		
		e.preventDefault();
		
		if (e.targetTouches.length == 1) {
			var touch = e.touches[0];
			move_event(touch);
		} 
		
	});

	
	

}



// ******** mode functions

function set_move ()
{
	operation = 'move';
	$('#rotate_button').removeClass('active');
	$('#move_button').addClass('active');
}


function set_rotate ()
{
	operation = 'rotate';
	$('#move_button').removeClass('active');
	$('#rotate_button').addClass('active');
}








// ******** event functions

function start_event (e)
{
	
	//get clicked on element
	clicked_element = e.target.id;
	
	//has an active_element been clicked on?
	if (active_elements.indexOf(clicked_element) == -1) {
		return false;
	}
	
	active = true;
		
	var ePageX = e.pageX || e.touches[0].pageX;
	var ePageY = e.pageY || e.touches[0].pageY;
	
	//set offset angle
	var mx = ePageX - $('#' + clicked_element).offset().left - ( $('#' + clicked_element).width() / 2);
	var my = ePageY - $('#' + clicked_element).offset().top - ( $('#' + clicked_element).height() / 2);
	offset_angle = get_angle_between(0, 0, mx, my);
	ini_rotation = objects[clicked_element].rotation;
		
}



function move_event (e)
{	

	if (!active) return false;
	
	var ePageX = e.pageX || e.touches[0].pageX;
	var ePageY = e.pageY || e.touches[0].pageY;
	
	if (operation == 'move') {

		$('#' + clicked_element).css({ left: ePageX - $('#my_container').offset().left - ($('#' + clicked_element).width() / 2) });
		$('#' + clicked_element).css({ top: ePageY - $('#my_container').offset().top - ($('#' + clicked_element).height() / 2) });
			
	}		
		
	if (operation == 'rotate') {
		
		//find mouse position relative to centre of clicked on element
		
		var mx = ePageX - $('#' + clicked_element).offset().left - ( $('#' + clicked_element).width() / 2);
		var my = ePageY - $('#' + clicked_element).offset().top - ( $('#' + clicked_element).height() / 2);
		var ang = offset_angle - get_angle_between(0, 0, mx, my) + ini_rotation;
		objects[clicked_element].rotation = ang;
		 
		$('#' + clicked_element).rotate(ang);
			
	}
		
}


function stop_event (e)
{
	active = false
}









// ******** generic functions


function change_cursor (e, object_id)
{

	var ex = e.pageX - $('#' + object_id).offset().left;
	var ey = e.pageY - $('#' + object_id).offset().top;

	var w = $('#' + object_id).width();
	var h = $('#' + object_id).height();
		
	if ( ( (ex > rotate_size) && (ex < w - rotate_size) ) && ( (ey > rotate_size) && (ey < h - rotate_size) ) ) {

			$('#' + object_id).css('cursor', 'move');
			
	} else {
	
		$('#' + object_id).css('cursor', 'pointer');
		
	}

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

