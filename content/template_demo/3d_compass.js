

//scene
var scene, camera, renderer;
var w, h;
var compass_x, compass_z, x_speed, z_speed, speed_inc, damper;
var x_min, x_max, z_min, z_max;
var power_on;
var needle_angle, target_angle;
var collision_size = 0.55;

//buttons
var move_left, move_right, move_up, move_down;

//objects
var grid, compass, compass_face, needle_north, needle_south, wire, wire_material_on, wire_material_off;
			
			
			
			
function init ()
{
	
	w = 600; 
	h = 500; 
	compass_x = 1;
	compass_z = 1;
	x_speed = 0;
	z_speed = 0;
	speed_inc = 0.001;
	damper = 0.97;
	power_on = true;
	target_angle = 0;
	needle_angle = 0;
	
	//buttons
	move_left = false;
	move_right = false;
	move_up = false;
	move_down = false;
	
	//limits
	x_min = -3;
	x_max = 3;
	z_min = -3;
	z_max = 3;
	
	scene = new THREE.Scene();
		
	camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 10000);
	camera.position.z = 3;
	camera.position.y = 3;
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	scene.add(camera);
				
	//light
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0, 10, 0);
	scene.add(light);
	
	load_grid();
	
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setClearColor('#f2f2f2', 1);
	renderer.setSize( w, h );
				
	document.getElementById('my_3d').appendChild(renderer.domElement);

	//attach event listeners
	$(document).mousedown(function (e) {
		
		var id = e.target.id;
		
		if (id == 'button_left') {
			move_left = true;
		} else if (id == 'button_right') {
			move_right = true;
		} else if (id == 'button_up') {
			move_up = true;
		} else if (id == 'button_down') {
			move_down = true;
		}
		
		
	});
	
	$(document).mouseup(function (e) {
		move_left = false;
		move_right = false;
		move_up = false;
		move_down = false;
	});
	
}
		
		


		
function update_scene ()
{

	//adjust speeds?
	//left / right
	if (move_left) {
	
		x_speed -= speed_inc;
		
	} else if (move_right) {
		
		x_speed += speed_inc;
		
	} else {
	
		//dampen speeds
		x_speed = x_speed * damper;
		
	}

	//left / right
	if (move_up) {
	
		z_speed -= speed_inc;
		
	} else if (move_down) {
		
		z_speed += speed_inc;
		
	} else {
	
		//dampen speeds
		z_speed = z_speed * damper;
		
	}
	
	
	//calculate new position
	compass_x += x_speed;
	compass_z += z_speed;
	
	
	//bounce?
	if (compass_x >= x_max) {
		x_speed = -x_speed;
		compass_x = x_max - (compass_x - x_max);
	} else if (compass_x <= x_min) {
		x_speed = -x_speed;
		compass_x = x_min - (compass_x - x_min);
	}
	
	if (compass_z >= z_max) {
		z_speed = -z_speed;
		compass_z = z_max - (compass_z - z_max);
	} else if (compass_z <= z_min) {
		z_speed = -z_speed;
		compass_z = z_min - (compass_z - z_min);
	}
	
	
	//collide with wire?
	var distance_from_center = Math.sqrt(Math.pow(compass_x, 2) + Math.pow(compass_z, 2));
	
	if (distance_from_center <= collision_size) {
		
		x_speed = -x_speed;
		z_speed = -z_speed;
		
	}
	
	
	//update model
	compass.position.x = compass_x;
	compass.position.z = compass_z;
	compass_face.position.x = compass_x;
	compass_face.position.z = compass_z;
	needle_north.position.x = compass_x;
	needle_north.position.z = compass_z;
	needle_south.position.x = compass_x;
	needle_south.position.z = compass_z;
	
	//rotate needle
	if (power_on) {
	
		target_angle = get_needle_angle(compass_x, compass_z);		
		
	} else {
	
		//needle needs to move to north
		target_angle = 0; 
		
	}
	
	var ang_diff = target_angle - needle_angle;

	while (ang_diff > 180) {
		ang_diff = ang_diff - 360;
	}

	while (ang_diff < -180) {
		ang_diff = ang_diff + 360;
	}
	
	needle_angle = needle_angle + (ang_diff / 16.0);
	
	needle_north.rotation.y = to_radians(-needle_angle + 180);
	needle_south.rotation.y = to_radians(-needle_angle);
		
	//render scene
	renderer.render(scene, camera);
	
	requestAnimationFrame(update_scene);
		
}




function toggle_power ()
{

	if (power_on) {
	
		$('#power_button').removeClass('power_on').addClass('power_off').html('Power OFF');
		wire.material = wire_material_off;
		power_on = false;
		
	} else {
	
		$('#power_button').removeClass('power_off').addClass('power_on').html('Power ON');
		wire.material = wire_material_on;
		power_on = true;
		
	}
	
}






function load_grid ()
{
	
	grid_texture = new THREE.ImageUtils.loadTexture('3d_compass/grid.png', {}, function () {
		
		var grid_material = new THREE.MeshLambertMaterial({ map:grid_texture, transparent:true, opacity:0.8 });
		var grid_geometry = new THREE.PlaneGeometry(7, 7);
		grid = new THREE.Mesh(grid_geometry, grid_material);
		scene.add(grid);
		grid.rotation.x = to_radians(-90);
		
		load_compass_face();
		
	})

}





function load_compass_face ()
{
	
	compass_face_texture = new THREE.ImageUtils.loadTexture('3d_compass/compass.png', {}, function () {
		
		var compass_face_material = new THREE.MeshPhongMaterial({ map:compass_face_texture, side:THREE.DoubleSide, transparent:true });
		var compass_face_geometry = new THREE.PlaneGeometry(1,1);
		compass_face = new THREE.Mesh(compass_face_geometry, compass_face_material);
		scene.add(compass_face);
		compass_face.rotation.x = to_radians(-90);
		compass_face.position.y = 0.1;
		
		compass_face.position.x = compass_x;
		compass_face.position.z = compass_z;
		
		load_compass();
		
	})

}



function load_compass ()
{
	
	var loader = new THREE.JSONLoader();
	
	loader.load('3d_compass/compass.json', function (compass_geometry) {
		
		var compass_material = new THREE.MeshLambertMaterial({ color: '#fecb11' });
		compass = new THREE.Mesh(compass_geometry, compass_material);
		scene.add(compass);
		
		load_needle();
		
	});

}



function load_needle ()
{
	
	var loader = new THREE.JSONLoader();
	
	loader.load('3d_compass/compass_needle.json', function (needle_geometry) {
		
		var needle_north_material = new THREE.MeshBasicMaterial({ color: '#e2e2e2' });
		var needle_south_material = new THREE.MeshBasicMaterial({ color: '#333333' });
		
		needle_north = new THREE.Mesh(needle_geometry, needle_north_material);
		scene.add(needle_north);
		
		needle_south = new THREE.Mesh(needle_geometry, needle_south_material);
		scene.add(needle_south);
		
		load_wire();
		
	});

}






function load_wire ()
{

	var wire_geometry = new THREE.CylinderGeometry(0.05, 0.05, 20);
	wire_material_on = new THREE.MeshBasicMaterial({ color: '#3fa535' });
	wire_material_off = new THREE.MeshBasicMaterial({ color: '#f1645d' });
	wire = new THREE.Mesh(wire_geometry, wire_material_on);
	scene.add(wire);
	update_scene();
	
}






function to_radians (ang)
{
	return (ang / 180) * Math.PI;
}



function to_degrees (ang)
{
	return (ang / Math.PI) * 180;
}



function get_needle_angle(x, y)
{

	var ang = Math.atan(y/x);
	ang = to_degrees(ang);
	
	if (x <= 0) {
		ang += 180;
	}
	
	return ang;
	
}



