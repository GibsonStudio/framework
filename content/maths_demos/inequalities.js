

var canvas = null; //a reference to the canvas to draw to
var context = null; //the canvas context
var symbol_objects; //an array of line objects
var default_length = 100; //the length that the initial 4 lines are drawn at
var x_origin = 350; //x coordinate of the centre position
var number_spacing = 50; //number of pixels between units
var animate_symbol = -1;
var ratio = 0.05; //how fast the lines move into position
var correct_symbol = 0;

//these target values are the values for the position the line will move to
var target_x;
var target_y = 240; //will always move onto the horizontal line - the X axis
var target_length;



function ini_vars ()
{

	canvas = document.getElementById('my_canvas');
	context = canvas.getContext('2d');
	clear_canvas();
	
	symbol_objects = [];
	animate_symbol = -1;
	
	add_symbol_object('symbol_0', 50, 50, default_length, 0, 0);
	add_symbol_object('symbol_1', 200, 50, default_length, 0, 1);
	add_symbol_object('symbol_2', 350, 50, default_length, 1, 0);
	add_symbol_object('symbol_3', 500, 50, default_length, 1, 1);
	
	draw_symbols();
	
	$('#symbol_0').removeClass('hotspot_wrong');
	$('#symbol_1').removeClass('hotspot_wrong');
	$('#symbol_2').removeClass('hotspot_wrong');
	$('#symbol_3').removeClass('hotspot_wrong');
	
}




function ask_question ()
{

	ini_vars();
	
	var num1 = Math.floor(Math.random() * 8) - 5;
	var num2 = num1 + Math.floor(Math.random() * (6 - num1));
	
	if (num1 == num2) {
		num2++;
	}
	
	target_x = x_origin + (num1 * number_spacing);
	target_length = number_spacing * (num2 - num1);

	correct_symbol = Math.floor(Math.random() * 4);
	
	var logic_1 = '&lt;';
	var logic_2 = '&lt;';
	
	switch (correct_symbol) {
		case 1:
			logic_2 = '&le;';
			break;
		case 2:
			logic_1 = '&le;';
			break;
		case 3:
			logic_1 = '&le;';
			logic_2 = '&le;';
			break;			
	}
	
	var question_text = num1 + ' ' + logic_1 + ' <span class="curly_font">x</span> ' + logic_2 + ' ' + num2;	
	$('#question').html(question_text);
	
}






function animate ()
{
	
	if (animate_symbol >= 0) {
	
		//clear canvas
		clear_canvas();
		
		//update objects
		var me = symbol_objects[animate_symbol];
		me.x = me.x + ((target_x - me.x) * ratio);
		me.y = me.y + ((target_y - me.y) * ratio);
		me.my_length = me.my_length + ((target_length - me.my_length) * ratio);
		
		//draw objects
		draw_symbols();
		
		//finished?
		if (Math.abs(me.x - target_x) < 0.5 && Math.abs(me.y - target_y) < 0.5 && Math.abs(me.my_length - target_length) < 0.5) {
			animate_symbol = -2;
			setTimeout(ask_question, 2000);
		}
	
		//call next frame
		window.requestAnimationFrame(animate);
	
	}

}





function draw_symbols ()
{
	
	for (var i = 0; i < symbol_objects.length; i++) {
	
		var me = symbol_objects[i];
		draw_symbol(me.x, me.y, {my_length:me.my_length, left_end:me.left_end, right_end:me.right_end});
		
	}
	
	
}




function draw_symbol (my_x, my_y, args)
{

	var args = args || {};
	var my_length	= args.my_length || 80;
	var left_end 		= args.left_end || 0; // 0 = empty, 1 = solid
	var right_end		= args.right_end || 0;
	var colour			= args.colour || 'rgba(228, 15, 24, 1)';
	
	//draw line
	draw_line(my_x, my_y, my_x + my_length, my_y, {strokeStyle: colour, lineWidth: 2, lineCap: 'round'});
	
	//draw left end
	var left_fillStyle = (left_end == 1) ? 'rgba(228, 15, 24, 1)' : 'rgba(255, 255, 255, 1)';
	draw_circle(my_x, my_y, 4, {fillStyle: left_fillStyle});
	
	//draw right end
	var right_fillStyle = (right_end == 1) ? 'rgba(228, 15, 24, 1)' : 'rgba(255, 255, 255, 1)';
	draw_circle(my_x + my_length, my_y, 4, {fillStyle: right_fillStyle});
	
}





function add_symbol_object (me_id, me_x, me_y, me_length, left_end, right_end)
{

	var me = {};
	me.id = me_id;
	me.x = me_x;
	me.y = me_y;
	me.my_length = me_length;
	me.left_end = left_end;
	me.right_end = right_end;
	symbol_objects.push(me);
	return true;

}



function symbol_clicked (symbol_index)
{

	if (animate_symbol >= 0) return false;
	
	if (symbol_index == correct_symbol) {
	
		//correct
		animate_symbol = symbol_index;
		animate();
		
	} else {
	
		//wrong 
		if (animate_symbol == -1) {
			$('#symbol_' + symbol_index).addClass('hotspot_wrong');
		}
		
	}
	
}









