
var canvas = null;
var context = null;
var img_objects = null;
var images = null;
var skidding = false;
var runway_image = 'runway';
var cf = 0.3; //coeffiecient of friction (dry)
var max_brake = 0.8; // dry

//smoke
var smoke = [];
var smoke_frequency = 3;
var smoke_index = 0;


var last_time;
var speed = 180;
var last_speed = speed;
var distance_travelled = 0;
var increment_distance = false;

var landscape_pos = 0;
var landscape_speed_factor = 0.15;
var buildings_pos = 0;
var buildings_speed_factor = 0.3;
var runway_pos = 0;
var runway_speed_factor = 1;
var grass_pos = 0;
var grass_speed_factor = 1.8;

var anim_factor = 0.005; //controls entire animation speed

//needles
var needle_viscosity = 0.1;
var force_angle = -150;
var decel_angle = -150;


function ini_vars ()
{
	
	canvas = document.getElementById('my_canvas');
	context = canvas.getContext('2d');
	img_objects = [];
	images = {	grass:'braking_sim\\grass.png',
				runway:'braking_sim\\runway.png',
				runway_wet:'braking_sim\\runway_wet.png',
				runway_ice:'braking_sim\\runway_ice.png',
				landscape:'braking_sim\\landscape.png',
				buildings:'braking_sim\\buildings.png',
				aeroplane:'braking_sim\\aeroplane.png'
			};
	
}




function reset_sim ()
{

	set_runway('dry');
	speed = 180;
	last_speed = speed;
	$('#brake').val(0);
	force_angle = -150;
	decel_angle = -150;
	distance_travelled = 0;
	increment_distance = false;
	
}






function images_loaded ()
{

	run_animation();
	
}






function run_animation ()
{

	clear_canvas();
	

	
	//calculate elapsed time	
	var now = new Date().getTime(),
    elapsed_time = now - (last_time || now);
	last_time = now;	
	
	
	
	
	//calculate values
	var brake = $('#brake').val();
	var brake_force = (0.7 * brake) + ((0.3 * brake) * (speed / 180.0));
	
	if (brake_force > max_brake) {
		brake_force = max_brake * cf;
		skidding = true;
	} else {
		skidding = false;
	}
  
	var decel = 1 - (brake_force * 0.008);
	
	speed = speed * decel; //slow aeroplane down
	
	//calulate deceleration
	speed_diff = last_speed - speed;
	last_speed = speed;
	
	
	//distance travelled
	
	if (brake > 0) {
		increment_distance = true;
	}
	
	if (increment_distance) {
		
		var meters_per_second = (speed * 1852) / (60 * 60);
		var dd = meters_per_second * (elapsed_time / 1000.0); //s = d/t
		distance_travelled += dd;
		
	}
	
	$('#distance_travelled').html(Math.round(distance_travelled));
	
	//show needles
	$('#speed_needle').rotate(-150 + ( (speed / 180.0) * 270));
	$('#speed_readout').html(Math.round(speed));
	
	var required_ang = -150 + (brake_force * 200);
	var ang_diff = required_ang - force_angle;
	force_angle += (ang_diff * needle_viscosity);	
	$('#force_needle').rotate(force_angle);
	
	var required_ang = -150 + (speed_diff * 300);
	var ang_diff = required_ang - decel_angle;
	decel_angle += (ang_diff * needle_viscosity);
	$('#deceleration_needle').rotate(decel_angle);
	
	
	
	//landscape
	landscape_pos -= (speed * elapsed_time * anim_factor * landscape_speed_factor);
	
	while (landscape_pos < -canvas.width) {
		landscape_pos += canvas.width;
	}
	
	//buildings
	buildings_pos -= (speed * elapsed_time * anim_factor * buildings_speed_factor);
	
	while (buildings_pos < -canvas.width) {
		buildings_pos += canvas.width;
	}
	
	//runway
	runway_pos -= (speed * elapsed_time * anim_factor * runway_speed_factor);
	
	while (runway_pos < -canvas.width) {
		runway_pos += canvas.width;
	}
	
	//grass
	grass_pos -= (speed * elapsed_time * anim_factor * grass_speed_factor);
	
	while (grass_pos < -canvas.width) {
		grass_pos += canvas.width;
	}
	
	
	//draw scenery
	context.drawImage(img_objects[get_image_index('landscape')].image, landscape_pos, 90);
	context.drawImage(img_objects[get_image_index('buildings')].image, buildings_pos, 100);
	context.drawImage(img_objects[get_image_index(runway_image)].image, runway_pos, 230);
	context.drawImage(img_objects[get_image_index('grass')].image, grass_pos, 330);
	
	//draw aeroplane
	context.drawImage(img_objects[get_image_index('aeroplane')].image, 0, 0);
	
	
	//add smoke
	smoke_index++;
	
	if (skidding && speed >= 5 && smoke_index >= smoke_frequency) {
		
		smoke_index = 0;
		add_smoke(236, 286); // front wheel
		add_smoke(54, 286); // rear wheel
		
	}
	
	
	update_smoke();
	
	//draw smoke
	for (var i = 0; i < smoke.length; i++) {
		
		var s = smoke[i];
		draw_smoke(s); 
		
	}
		
	//output debug text?
	//var debug = 'Speed(' + Math.round(speed) + ') distance(' + Math.round(distance_travelled) + ') + elapsed_time(' + elapsed_time + ')';
	//context.fillStyle = '#000000';
	//context.fillText(debug, 10, 120);
	
	
	//call next frame
	window.requestAnimationFrame(run_animation);
	
}





function apply_max_brakes ()
{	
	$('#brake').val(max_brake);
}





function set_runway (type)
{
	
	var type = type || 'dry';

	if (type == 'wet') {
		
		runway_image = 'runway_wet';
		cf = 0.2;
		max_brake = 0.55; 
		
	} else if (type == 'ice') {
		
		runway_image = 'runway_ice';
		cf = 0.1;
		max_brake = 0.3; 
		
	} else {
		
		//default - dry
		runway_image = 'runway';
		cf = 0.3;
		max_brake = 0.8; 
		
	}
	
}




function update_smoke ()
{

	for (var i = 0; i < smoke.length; i++) {
		
		var s = smoke[i];
		s.x = s.x - (speed * anim_factor * 2);
		s.y -= 0.2; // make it move up a bit
		s.radius += 0.2;
		s.alpha -= 0.02;
		
		
		
		if (s.alpha < 0.1) {
			smoke.splice(i, 1);
			i = i - 1;
		} else {
			smoke[i] = s;
		}
		
		
	}
	
}






function draw_smoke (s)
{
	
	var s = s || {};
	var c = s.colour;
	var colour = 'rgba(' + c + ', ' + c + ', ' + c + ', ' + s.alpha + ')';
	draw_circle(s.x, s.y, s.radius, { strokeStyle: colour, fillStyle: colour});
	
}





function add_smoke (sX, sY)
{
	
	var new_smoke = {};
	new_smoke.x = sX;
	new_smoke.y = sY + (5 * Math.random());
	new_smoke.radius = 1;
	new_smoke.colour = 150 + Math.round(Math.random() * 100);
	new_smoke.alpha = 1;
	
	smoke.push(new_smoke);
	
}


















