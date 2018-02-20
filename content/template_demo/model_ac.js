

var scene, camera, renderer, controls;
var w, h, control_speed, animate_aircraft;
	
//materials
var material_white, material_blue, material_red;

//objects
var ac, wing_left, wing_right, flap_left, flap_right, aileron_left, aileron_right, elevator, rudder;
	
//controls
var joystick_active, joystick_x, joystick_y, return_to_center, return_speed, deadzone;

//mouse
var pageX, pageY;

function init ()
{
	
	w = 600; 
	h = 600; 
	control_speed = 0.01;
	animate_aircraft = false;

	//controls
	joystick_active = false;
	joystick_x = 0;
	joystick_y = 0;
	return_to_center = true;
	return_speed = 0.1;
	deadzone = 10;
	
	//mouse
	pageX = 0;
	pageY = 0;
	
	$(document).mousemove( function (e) {
		
		pageX = e.pageX;
		pageY = e.pageY;
		
	});
	
	
	$('#joystick').mousedown( function (e) {
		joystick_active = true;
	});
	
	
	$(document).mouseup( function () {
		joystick_active = false;
	});
	
	
	//3D scene
	scene = new THREE.Scene();
		
	camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 10000);
	camera.position.set(-3, 3, -15);
	camera.lookAt(new THREE.Vector3( 0, 0, 0 ));
	scene.add(camera);

	
				
	load_model_ac();
	
	//materials
	material_white = new THREE.MeshLambertMaterial({ color:'#f2f2f2' });
	material_blue = new THREE.MeshLambertMaterial({ color:'#3e4899' });
	material_red = new THREE.MeshLambertMaterial({ color:'#e40f18' });

				
	//light
	var light = new THREE.PointLight(0xe5dab9);
	light.position.set(-5, 10, 0);
	scene.add(light);
		
	var light = new THREE.PointLight(0xf2f2f2);
	light.position.set(5, 10, 0);
	scene.add(light);
	
	var light = new THREE.PointLight(0xbdc6e6);
	light.position.set(0, -5, 0);
	scene.add(light);
	
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setClearColor('#f9f9f9', 1);
	renderer.setSize( w, h );

	document.getElementById('render_container').appendChild(renderer.domElement);
	
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	
}
		
		



function load_model_ac ()
{
	
	var loader = new THREE.JSONLoader();
	loader.load( 'model_ac/model_ac.json', function (ac_geometry) {
		ac = new THREE.Mesh(ac_geometry, material_white);
		scene.add(ac);
		load_wing_left();
	});
	
}


function load_wing_left ()
{
	
	var loader = new THREE.JSONLoader();
	loader.load( 'model_ac/wing_left.json', function (wing_geometry) {

		wing_left = new THREE.Mesh(wing_geometry, material_blue);
		wing_left.position.y = -0.6;
		wing_left.rotation.z = to_radians(8);
		ac.add(wing_left);
		
		load_wing_right();
		
	});
	
}


function load_wing_right ()
{
	
	var loader = new THREE.JSONLoader();
	loader.load( 'model_ac/wing_right.json', function (wing_geometry) {

		wing_right = new THREE.Mesh(wing_geometry, material_blue);
		wing_right.position.y = -0.6;
		wing_right.rotation.z = to_radians(-8);
		ac.add(wing_right);
		
		load_flap();
		
	});
	
}


function load_flap ()
{
	
	var loader = new THREE.JSONLoader();
	loader.load( 'model_ac/flap.json', function (flap_geometry) {

		//left
		flap_left = new THREE.Mesh(flap_geometry, material_blue);
		flap_left.position.x = 3.5;
		flap_left.position.y = 0.2;
		flap_left.position.z = -0.7;
		wing_left.add(flap_left);
		
		//left
		flap_right = new THREE.Mesh(flap_geometry, material_blue);
		flap_right.position.x = -3.5;
		flap_right.position.y = 0.2;
		flap_right.position.z = -0.7;
		wing_right.add(flap_right);
		
		load_aileron();
		
	});
	
}


function load_aileron ()
{
	
	var loader = new THREE.JSONLoader();
	loader.load( 'model_ac/aileron.json', function (aileron_geometry) {
		
		//left
		aileron_left = new THREE.Mesh(aileron_geometry, material_blue);
		aileron_left.position.x = 7.5;
		aileron_left.position.y = 0.2;
		aileron_left.position.z = -0.7;
		wing_left.add(aileron_left);
		
		//right
		aileron_right = new THREE.Mesh(aileron_geometry, material_blue);
		aileron_right.position.x = -7.5;
		aileron_right.position.y = 0.2;
		aileron_right.position.z = -0.7;
		wing_right.add(aileron_right);
		
		load_elevator();
		
	});
	
}


function load_elevator ()
{
	
	var loader = new THREE.JSONLoader();
	loader.load( 'model_ac/elevator.json', function (elevator_geometry) {
		elevator = new THREE.Mesh(elevator_geometry, material_blue);
		elevator.position.y = 1;
		elevator.position.z = -7.8;
		ac.add(elevator);
		load_rudder();
	});
	
}


function load_rudder ()
{
	
	var loader = new THREE.JSONLoader();
	loader.load( 'model_ac/rudder.json', function (rudder_geometry) {
		rudder = new THREE.Mesh(rudder_geometry, material_blue);
		rudder.position.y = 2.08;
		rudder.position.z = -8.45;
		ac.add(rudder);
		update_scene();
	});
	
}

		
function update_scene ()
{

	//process controls
	if (joystick_active) {		
		
		joystick_x = pageX - $('#control_pad').offset().left - ($('#control_pad').width() / 2);
		joystick_y = pageY - $('#control_pad').offset().top - ($('#control_pad').height() / 2);

		joystick_x = Math.min(Math.max(parseInt(joystick_x), -100), 100);
		joystick_y = Math.min(Math.max(parseInt(joystick_y), -100), 100);
		
		
		
		//move joystick
		$('#joystick').css({ left: joystick_x + 100 - 10 });
		$('#joystick').css({ top: joystick_y + 100 - 10 });
		
	} else if (return_to_center) {
		
		joystick_x -= (joystick_x * return_speed);
		$('#joystick').css({ left: joystick_x + 100 - 10 });
		
		joystick_y -= (joystick_y * return_speed);
		$('#joystick').css({ top: joystick_y + 100 - 10 });
		
	}
	
	var control_x = joystick_x;
	var control_y = joystick_y;
	
	//joystick deadzone
	if (Math.abs(control_x) < deadzone) { control_x = 0; }
	if (Math.abs(control_y) < deadzone) { control_y = 0; }
	
	//move control surfaces
	
	//roll
	var aileron_angle = to_radians(control_x / 3);
	aileron_left.rotation.x = -aileron_angle;
	aileron_right.rotation.x = aileron_angle;
	
	//pitch
	var elevator_angle = to_radians(control_y / 3);
	elevator.rotation.x = elevator_angle;
	
	//yaw
	var rudder_angle = to_radians($('#rudder').val());
	rudder.rotation.y = rudder_angle;
	
	//flaps
	var flap_angle = -$('#flap').val();
	flap_left.rotation.x = to_radians(flap_angle);
	flap_right.rotation.x = to_radians(flap_angle);
	
	//rotate aircraft?
	if (animate_aircraft) {
		ac.rotateOnAxis(new THREE.Vector3(0,0,1), aileron_angle * control_speed);
		ac.rotateOnAxis(new THREE.Vector3(1,0,0), elevator_angle * -control_speed);
		ac.rotateOnAxis(new THREE.Vector3(0,1,0), rudder_angle * -(control_speed / 2) );
	}
	

	
	renderer.render(scene, camera);
	
	requestAnimationFrame(update_scene);
	
}





function toggle_animate_aircraft ()
{

	animate_aircraft = !animate_aircraft;
	
	if (animate_aircraft) {
		
		$('#animate_aircraft').html('Animate ON');
		$('#animate_aircraft').addClass('toggle_on').removeClass('toggle_off');
		
	} else {
		
		$('#animate_aircraft').html('Animate OFF');
		$('#animate_aircraft').addClass('toggle_off').removeClass('toggle_on');
		
	}

}




function toggle_return_to_center ()
{

	return_to_center = !return_to_center;
	
	if (return_to_center) {
		
		$('#return_to_center').html('Centre ON');
		$('#return_to_center').addClass('toggle_on').removeClass('toggle_off');
		
	} else {
		
		$('#return_to_center').html('Centre OFF');
		$('#return_to_center').addClass('toggle_off').removeClass('toggle_on');
		
	}

}








function toggle_hilight (this_el, surface)
{
	
	for (var i = 0; i < surface.length; i++) {
		
		var s = surface[i];
		
		if (s.material == material_blue) {
			
			s.material = material_red;
			$(this_el).addClass('toggle_on').removeClass('toggle_off');
			
		} else {
			
			s.material = material_blue;
			$(this_el).addClass('toggle_off').removeClass('toggle_on');
			
		}
	
	}

}












