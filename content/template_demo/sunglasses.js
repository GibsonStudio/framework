

var active = false;


function ini_scene ()
{
	
	//mouse events
	document.body.addEventListener('mousemove', function (e) { move_me(e); }); 
	document.getElementById('my_container').addEventListener('mousedown', function (e) { start_move(e); });
	document.body.addEventListener('mouseup', function (e) { stop_move(e); });
	
	//touch events
	document.getElementById('my_container').addEventListener('touchmove', function (e) {
		if (e.targetTouches.length == 1 && active) {
			e.preventDefault();
			var touch = e.targetTouches[0];
			move_me(touch);
		}
	});
	
	document.body.addEventListener('touchend', function (e) { stop_move(e); });	
	document.getElementById('my_container').addEventListener('touchstart', function (e) { start_move(e); });
	
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
	
	//if (!active) return;
	
	var my_x = e.pageX - $('#my_container').offset().left - 220;
	var my_y = e.pageY - $('#my_container').offset().top - 100;
	
	draw_mask(my_x, my_y);
		
}







function draw_mask (x, y)
{
	
	var html = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="640" height="480">';
	html += '<mask id="mask1">';
	
	//left eye
	html += '<path d="';
	html += 'M' + (x + 19.798) + ',' + (y + 85.641);
	html += 'c0,0-3.841,38.454,22.782,64.404';
	html += 'c26.624,25.952,75.765,35.633,131.001-27.697';
	html += 'c55.234-63.33,20.795-100.306-24.24-101.919';
	html += 'C' + (x + 104.306) + ',' + (y + 18.814) + ',' + (x + 30.66) + ',' +  (y - 0.279) + ',' + (x + 19.798) + ',' + (y + 85.641) + 'z" fill="white" />';
		
	//right eye
	html += '<path d="';
	html += 'M' + (x + 421.877) + ',' + (y + 85.641);
	html += 'c0,0,3.841,38.454-22.783,64.404';
	html += 'c-26.624,25.952-75.765,35.633-131.001-27.697';
	html += 'c-55.234-63.33-20.795-100.306,24.24-101.919';
	html += 'C' + (x + 337.369) + ',' + (y + 18.814) + ',' + (x + 411.015) + ',' + (y - 0.279) + ',' + (x + 421.877) + ',' + (y + 85.641) + 'z" fill="white" />';
	
	html += '</mask>';
	
	html += '<image xlink:href="sunglasses/with_glasses.png" width="640" height="480" mask="url(#mask1)"/>';
	
	html += '</svg>';
	
	$('#with_glasses').html(html);

}