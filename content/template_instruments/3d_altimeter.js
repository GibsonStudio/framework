
var altimeter = {};
altimeter.altitude = 3000;
altimeter.pressure = 1000;
altimeter.subscale = 1000;

var altimeter_rotation = 0;

var scene;
var camera;
var renderer;

var altimter_mesh;
var needle_100;
var needle_1000;
var needle_10000;
var subscale;
var subscale_knob;
var capsule;
var frame;
var xrod;



function ini_scene ()
{

	scene = new THREE.Scene();
	var WIDTH = 500;
	var HEIGHT = 500;

	camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 0.1, 10);
	scene.add(camera);

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor('#f2f2f2', 1);
	renderer.setSize(WIDTH, HEIGHT);

	document.getElementById('altimeter').appendChild(renderer.domElement);

	var loader = new THREE.ColladaLoader();

	loader.load('collada_altimeter.dae', function (collada) {

		var dae = collada.scene;
		scene.add(dae);

		altimeter_mesh = scene.getObjectByName('altimeter');
		needle_100 = scene.getObjectByName('needle_100');
		needle_1000 = scene.getObjectByName('needle_1000');
		needle_10000 = scene.getObjectByName('needle_10000');
		subscale = scene.getObjectByName('subscale');
		subscale_knob = scene.getObjectByName('subscale_knob');
		capsule = scene.getObjectByName('capsule');
		frame = scene.getObjectByName('frame');
		xrod = scene.getObjectByName('x_rod');

		//console.dir(subscale);

		var blender_cam = scene.getObjectByName('blender_camera');
		camera.position.set(blender_cam.position.x, blender_cam.position.y, blender_cam.position.z);
		camera.rotation.set(blender_cam.rotation.x, blender_cam.rotation.y, blender_cam.rotation.z);

		draw_altimeter();

		setTimeout( function () {
			draw_altimeter();
		}, 500);

	});

}







function draw_altimeter ()
{

	//rotation
	altimeter_mesh.rotation.z = to_radians(altimeter_rotation);

	var pressure_diff = altimeter.subscale - altimeter.pressure;
	var alt_inc = pressure_diff * 30.0;
	var indicated_altitude = altimeter.altitude + alt_inc;

	//100s needle
	needle_100.rotation.y = to_radians((indicated_altitude / 1000.0) * 360);

	//1000s needle
	needle_1000.rotation.y = to_radians((indicated_altitude / 10000.0) * 360);

	//10,000s needle
	needle_10000.rotation.y = to_radians((indicated_altitude / 100000.0) * 360);

	//subscale
	var sub_ang = to_radians(((1000 - altimeter.subscale) / 50) * 150);
	subscale.rotation.y = sub_ang; //0; to_radians(((altimeter.subscale - 1000) / (100) ) * -300);
	subscale_knob.rotation.y = sub_ang * 3;

	//capsule
	var capsule_scale =  1 + ((altimeter.altitude - 3000) * 0.00005);
	capsule.scale.z = capsule_scale;

	//frame
	var frame_scale =  1 + ((altimeter.altitude - 3000) * 0.000012);
	frame.scale.z = frame_scale;

	//x_rod
	xrod.rotation.y = (1 - capsule_scale) * 0.3;

	renderer.render(scene, camera);

}










$(document).ready(function () {

	//set sliders
	document.sliders.altitude.value = altimeter.altitude;
	$('#altitude_value').html('<b>Altitude:</b> ' + parseInt(altimeter.altitude) + ' ft');
	document.sliders.pressure.value = altimeter.pressure;
	$('#pressure_value').html('<b>Pressure:</b> ' + parseInt(altimeter.pressure) + ' hPa');
	document.sliders.subscale.value = altimeter.subscale;
	$('#subscale_value').html('<b>Subscale:</b> ' + parseInt(altimeter.subscale) + ' hPa');
	document.sliders.rotation.value = altimeter_rotation;
	$('#rotate_value').html('<b>Rotation:</b> ' + parseInt(altimeter_rotation) + '&deg;');

});




/* ******** sliders ******** */

function altitude_slider (val)
{
	$('#altitude_value').html('<b>Altitude:</b> ' + parseInt(val) + ' ft');
	altimeter.altitude = val * 1.0;
	draw_altimeter();
}

function pressure_slider (val)
{
	$('#pressure_value').html('<b>Pressure:</b> ' + parseInt(val) + ' hPa');
	altimeter.pressure = val * 1.0;
	draw_altimeter();
}

function subscale_slider (val)
{
	$('#subscale_value').html('<b>Subscale:</b> ' + parseInt(val) + ' hPa');
	altimeter.subscale = val * 1.0;
	draw_altimeter();
}

function rotate_slider (val)
{
	$('#rotate_value').html('<b>Rotation:</b> ' + parseInt(val) + '&deg;');
	altimeter_rotation = val * 1.0;
	draw_altimeter();
}
