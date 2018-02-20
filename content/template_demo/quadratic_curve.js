

var active = false; //curve tracks mouse position when active = true

//position of origin in #axis
var origin_x = 350;
var origin_y = 360; 

//store mouse cursor offset from origin on #curve - so curve does not jump when you grab it
var offset_x = 0;
var offset_y = 0;

//offset to put #curve zero point on #axis origin
var origin_offset_x = 204;
var origin_offset_y = 402;

//position of #curve
var x, y;
var my_x_min = -180;
var my_x_max = 470;
var my_y_min = -340;
var my_y_max = 145;

//position of #curve origin on #axis
var curve_x = 0;
var curve_y = 0;

//how many pixels each unit of the axis spans - used to turn pixel position into graph position
var x_factor = 50;
var y_factor = 24.6;


function ini_scene ()
{

	position_curve(curve_x, curve_y);
	show_equation(curve_x, curve_y);
	
	//mouse events
	document.getElementById('curve').addEventListener('mousedown', function (e) { start_move(e); });
	document.body.addEventListener('mouseup', function (e) { stop_move(e); });
	document.body.addEventListener('mousemove', function (e) { move_me(e); });
	
	//touch events
	document.getElementById('curve').addEventListener('touchmove', function (e) {
		if (e.targetTouches.length == 1) {
			e.preventDefault();
			var touch = e.targetTouches[0];
			move_me(touch);
		}
	});
	
	document.body.addEventListener('touchend', function (e) { stop_move(e); });	
	document.getElementById('curve').addEventListener('touchstart', function (e) { start_move(e); });
	
}



function start_move (e)
{
	e.preventDefault();
	
	eX = e.pageX || e.touches[0].pageX;
	eY = e.pageY || e.touches[0].pageY;
	
	x = eX - $('#axis').offset().left;
	y = eY - $('#axis').offset().top;	
	
	offset_x = x - $('#curve').offset().left + $('#axis').offset().left;
	offset_y = y - $('#curve').offset().top + $('#axis').offset().top;
	active = true;	
}


function stop_move (e)
{
	
	//snap curve to position
	curve_x = Math.round(curve_x);
	curve_y = Math.round(curve_y);
	position_curve(curve_x, curve_y);		
	active = false;
	
	//show equation
	show_equation(curve_x, curve_y);
	
}


function move_me (e)
{
	
	x = e.pageX - $('#axis').offset().left;
	y = e.pageY - $('#axis').offset().top;		
		
	if (active) {
		
		var my_x = x - offset_x;
		var my_y = y - offset_y;
			
		//limit my_y and my_y
		my_x = Math.min(Math.max(my_x_min, my_x), my_x_max);
		my_y = Math.min(Math.max(my_y_min, my_y), my_y_max);
			
		$('#curve').css({ left: my_x + 'px', top: my_y + 'px' });
			
		//work out position of curve on graph
		curve_x = (my_x - (origin_x - origin_offset_x)) / x_factor;
		curve_y = (my_y + (origin_offset_y - origin_y)) / -y_factor;
			
	}
		
}









function position_curve ( this_x, this_y)
{

	var my_x = (this_x * x_factor) + (origin_x - origin_offset_x);
	var my_y = (this_y * -y_factor) - (origin_offset_y - origin_y);
	$('#curve').css({ left: my_x + 'px', top: my_y + 'px' });
	
}




function show_equation (this_x, this_y)
{

	var html = '<i>y</i> = ';
		
	if (curve_x == 0) {
		html += '<i>x</i>';
	} else if (curve_x > 0) {
		html += '(<i>x</i> - ' + curve_x + ')';
	} else if (curve_x < 0) {
		html += '(<i>x</i> + ' + Math.abs(curve_x) + ')';
	}
		
	html += '<sup>2</sup>';
		
	if (curve_y > 0) {
		html += ' + ' + curve_y;
	} else if (curve_y < 0) {
		html += ' - ' + Math.abs(curve_y);
	}
		
	$('#equation').html(html);
	
}






