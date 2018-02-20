var frame_rate = 30;
var speed_of_sound = 768;

//canvas vars
var my_canvas;
var my_context;
	
//aircraft vars
var ac_speed = 300;
var ac_width = 90;
var ac_X = 0;
var ac_Y = 200;
var ac_offset_X = -85;
var ac_offset_Y = -12;
var speed_multiplier = 0.01;
var ac_img = new Image();
ac_img.src = 'aeroplane.png';

//wave vars
var wave_speed = speed_of_sound / 100;
var waves_array = new Array();
var wave_every_frame = 4; //wave every x frames
var frames_since_last_wave = 0;
var max_wave_radius = 280;



function start_animation ()
{
	
	my_canvas = document.getElementById("my_canvas");
	my_context = my_canvas.getContext("2d");

	set_speed_slider(ac_speed);
	run_each_frame();
	
}




function run_each_frame ()
{

	clear_canvas();	

	ac_speed = $('#speed').val();
	
	//draw aeroplane	
	var dx = ac_speed * speed_multiplier;
	ac_X += dx;
	
	if (ac_X >= (my_canvas.width + ac_width) ) {
		ac_X = 0;
	}
	
	my_context.drawImage(ac_img, ac_X + ac_offset_X, ac_Y + ac_offset_Y);
	
	
	//do we need to add a new wave?
	frames_since_last_wave++;
	
	if (frames_since_last_wave >= wave_every_frame) {
	
		frames_since_last_wave = 0;
		add_wave(ac_X, ac_Y, wave_speed);
		
	}
	
	
	
	//update waves
	for (i in waves_array) {
	
		me = waves_array[i];
		
		//do we need to kill this wave?
		if (me.radius > max_wave_radius) {
		
			delete_wave(i);
			
		} else {
		
			//increment radius
			me.radius = me.radius + me.speed;
		
			//decrease alpha			
			my_alpha = 1 - (me.radius / max_wave_radius);			
			my_context.strokeStyle = 'rgba(0,0,0,' + my_alpha + ')';
			
			my_context.beginPath();
			my_context.arc(me.x, me.y, me.radius, 0, Math.PI * 2);
			my_context.stroke();
		
		}
		
				
	
	}
	
	
	//rotate machmeter needle
	var ang = (ac_speed / speed_of_sound) * 150;
	$('#machmeter_needle').rotate(ang);

	//call next frame
	setTimeout(run_each_frame, (1000.0 / frame_rate) );
	
}






function add_wave (x, y, speed) {

	var me = {};
	me.x = x;
	me.y = y;
	me.speed = speed; //increment per frame
	me.radius = 0;
	
	waves_array.push(me);
	
}





function delete_wave (index) {
	
	waves_array.splice(index, 1);
	
}





function set_speed_slider (speed)
{
	$('#speed').val(speed);	
}




function clear_canvas ()
{

    //my_context.clearRect(0, 0, my_canvas.width, my_canvas.height);	
	my_context.fillStyle = '#478fd7';
	my_context.fillRect(0,0, my_canvas.width, my_canvas.height);
	
}