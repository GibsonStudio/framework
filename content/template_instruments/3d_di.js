
var scene;
var renderer;
var camera;
var dae;
var gear_vertical;
var gear_horizontal;
var gyro_case;
var gyro;
var case_material;
var dir_offset = 0;
var dial;
var pull_knob;
var middle_gear;

function init ()
{

	scene = new THREE.Scene();
	var WIDTH = 800;
	var HEIGHT = 500;

	camera = new THREE.PerspectiveCamera(30, WIDTH / HEIGHT, 0.1, 10000);
	scene.add(camera);

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setClearColor('#ffffff', 1);
	renderer.setSize( WIDTH, HEIGHT );

	document.getElementById('di').appendChild(renderer.domElement);


	var loader = new THREE.ColladaLoader();

	loader.load('collada_di.dae', function (collada) {

		dae = collada.scene;
		scene.add(dae);

		var blender_cam = scene.getObjectByName('blender_camera');
		camera.position.set(blender_cam.position.x, blender_cam.position.y, blender_cam.position.z);
		camera.rotation.set(blender_cam.rotation.x, blender_cam.rotation.y, blender_cam.rotation.z);

		//assign objects to global vars

		gear_vertical = scene.getObjectByName('gear_vertical');
		gear_horizontal = scene.getObjectByName('gear_horizontal');
		gyro_case_pivot = scene.getObjectByName('gyro_case_pivot');
		gyro_case_pivot.rotation.x = -0.5;
		gyro = scene.getObjectByName('gyro');
		gyro_case = scene.getObjectByName('gyro_case_left');
		dial = scene.getObjectByName('dial_main');
		pull_knob = scene.getObjectByName('pull_knob');
		middle_gear = scene.getObjectByName('middle_gear');

		case_material = gyro_case.children[0].material;
		case_material.transparent = true;
		case_material.opacity = 0.1;

		//fade chassis
		var chassis = scene.getObjectByName('chassis');
		var mat = chassis.children[0].material;
		mat.transparent = true;
		mat.opacity = 0.1;

		//set ac to transparent
		var p = scene.getObjectByName('ac_gfx');
		var plane_mat = p.children[0].material;
		plane_mat.transparent = true;
		plane_mat.opacity = 0.5;

		update_model();
		start_animation();

	});



}




function update_model ()
{

	var direction = $('#dir_slider').val() * 1;
	var dir_offset = $('#offset_slider').val() * 1;
	$('#direction').html('<b>Direction:</b> ' + direction + '&deg;');
	$('#offset').html('<b>Offset:</b> ' + dir_offset + '&deg;');

	var ang = to_radians(direction);
	var offset = to_radians(dir_offset);
	dae.rotation.z = -ang;
	gear_vertical.rotation.x = -ang;
	gear_horizontal.rotation.z = ang;
	dial.rotation.x = -ang + offset;
	pull_knob.rotation.x = -offset * 2;
	middle_gear.rotation.x = offset;

}






function start_animation ()
{

	setInterval(function () {

		//spin gyro and render scene
		gyro.rotation.y += 0.1;
		//debug('render');
		renderer.render(scene, camera);

	}, 33);

}





function to_radians (ang)
{
	return (ang / 180.0) * Math.PI;
}
