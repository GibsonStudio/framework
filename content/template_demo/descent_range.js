
var canvas = null;
var context = null;


function ini_vars ()
{
	
	canvas = document.getElementById('my_canvas');
	context = canvas.getContext('2d');	
	clear_canvas();
	draw_circle(350, 190, 180, {fillStyle:'rgba(223, 0, 0, 0.5)', strokeStyle:'rgba(223, 0, 0, 0.8)'});
}



function slider_changed ()
{

	var drag = $('#drag').val();
	var radius = 180 - (100 * drag);

	clear_canvas();
	draw_circle(350, 190, radius, {fillStyle:'rgba(223, 0, 0, 0.5)', strokeStyle:'rgba(223, 0, 0, 0.8)'});
	
}












