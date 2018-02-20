

//x axis
var x_min = 0; //numerical value of minimum x
var x_max = 720; //numerical value of maximum x
var x_px_min = 40; //pixel position of x_min
var x_px_max = 760; //pixel position of x_max

//y axis
var y_min = -5; //numerical value of minimum y
var y_max = 5; //numerical value of maximum y
var y_px_min = 550; //pixel position of y_min
var y_px_max = 50; //pixel position of y_max

//other vars
var step_size = 2; // pixels between points on graph




function custom_graph ()
{

	var var_1 = $('#var_1').val();
	var var_2 = $('#var_2').val();
	show_sin(var_1, var_2);
	
}



function show_sin (var_1, var_2)
{

	var prev_x = 0;
	var prev_y = 0;
	
	for (var i = x_min; i <= x_max; i += step_size) {
		
		//get angle as radians and calculate y
		var x = (i / 180) * Math.PI;
		var y = var_1 * Math.sin(var_2 * x);
		
		//turn these numbers into coordinates
		draw_line(x_to_screen(prev_x), y_to_screen(prev_y), x_to_screen(i), y_to_screen(y), { lineWidth: 1, strokeStyle:'rgba(62, 72, 153, 1)' } );
		
		//store values for next loop
		prev_x = i;
		prev_y = y;
	
	}

}



function x_to_screen (x)
{

	var step = (x_px_max - x_px_min) / (x_max - x_min);
	var ox = x_px_min + (x_min * step); 
	
	var screen = ox + ( (x / (x_max - x_min) ) * (x_px_max - x_px_min) );
	return screen;
	
}



function y_to_screen (y)
{
	
	var step = (y_px_min - y_px_max) / (y_max - y_min);
	var oy = y_px_max + (y_max * step); 	
	
	var screen = oy - ( (y / (y_max - y_min) ) * (y_px_min - y_px_max) );
	return screen;
	
}









