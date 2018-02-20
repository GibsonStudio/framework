
var my_x = 0;
var my_y = 0;
var ox = 40;
var oy = 200;
var x_max = 660;
var y_min = 40;
var y_max = 360;

function ini_me () {
	
	document.body.addEventListener('mousemove', function (e) { move_event(e); });
	
	document.getElementById('my_canvas').addEventListener('touchmove', function (e) {
		
		e.preventDefault();
		
		if (e.targetTouches.length == 1) {
			var touch = e.touches[0];
			move_event(touch);
		} 
		
	});
}




function move_event (e)
{
	
	my_x = e.pageX - $('#my_container').offset().left;
	my_y = e.pageY - $('#my_container').offset().top;
	
	//exit function if mouse out of bounds
	if ( (my_x < ox) || (my_x > x_max) ) {
		return;
	}
	
	clear_canvas();
	
	//draw vertical line
	var angle = ((my_x - ox) / (x_max - ox)) * 360;
	
	//convert to radians
	var radians = (angle / 180) * Math.PI;
	
	//calculate cosine
	var cos = Math.cos(radians).toFixed(2);
	
	//draw vertical line
	var green = 'rgba(63, 165, 53, 1)';
	var y_pos = oy - (cos * (oy - y_min));
	draw_line(my_x, oy, my_x, y_pos, { strokeStyle: green, lineWidth: 1} );
	
	//add text
	
	angle = angle.toFixed(0);
	
	var offset = 18;
	if (cos < 0) {
		offset = -8;
	} else {
		offset = 18;
	}
	
	draw_rect(my_x - 14, oy + offset - 12, 30, 14, { fillStyle:'rgba(255, 255, 255, 1)', lineWidth: 0, strokeStyle: 'rgba(0,0,0,0)' });
	draw_text(my_x - 10, oy + offset, angle, { fillStyle: green, fontSize: 14 } );
	
	//draw horizontal line
	var red = 'rgba(228, 15, 24, 1)';
	draw_line(ox, y_pos, my_x, y_pos, { strokeStyle: red, lineWidth: 1} );
	
	//add text
	draw_rect(ox - 40, y_pos - 10, 38, 20, { fillStyle:'rgba(255, 255, 255, 1)', lineWidth: 0, strokeStyle: 'rgba(0,0,0,0)' });	
	draw_text(ox - 36, y_pos + 5, cos, { fillStyle: red, fontSize: 14 } );
	
	//write to text box
	var html = 'Cosine of ' + angle + ' is equal to ' + cos;
	$('#my_output').html(html);
	
}











