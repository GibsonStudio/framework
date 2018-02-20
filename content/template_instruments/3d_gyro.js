
var scene;
var renderer;
var camera;

var gyro;
var gimbal_inner;
var gimbal_outer;
var inner_rate = 0;
var outer_rate = 0;

function init ()
{

	scene = new THREE.Scene();
	var WIDTH = 500;
	var HEIGHT = 500;

	camera = new THREE.PerspectiveCamera(48, WIDTH / HEIGHT, 0.1, 10000);
	scene.add(camera);

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setClearColor('#ffffff', 1);
	renderer.setSize( WIDTH, HEIGHT );

	document.getElementById('gyro').appendChild(renderer.domElement);


	var loader = new THREE.ColladaLoader();

	loader.load('collada_gyro.dae', function (collada) {

		dae = collada.scene;
		scene.add(dae);

		var blender_cam = scene.getObjectByName('blender_camera');
		camera.position.set(blender_cam.position.x, blender_cam.position.y, blender_cam.position.z);
		camera.rotation.set(blender_cam.rotation.x, blender_cam.rotation.y, blender_cam.rotation.z);

		//assign objects to global vars
		gyro = scene.getObjectByName('gyro');
		gimbal_inner = scene.getObjectByName('gimbal_inner');
		gimbal_outer = scene.getObjectByName('gimbal_outer');

		start_animation();

	});



}




function update_inner (val)
{
	inner_rate = val * 1.0;
	$('#gimbal_inner').html('<b>Inner Gimbal Rate:</b> ' + (Math.round(val * 30)) + '&deg; / s');
}



function update_outer (val)
{
	outer_rate = val * 1.0;
	$('#gimbal_outer').html('<b>Outer Gimbal Rate:</b> ' + (Math.round(val * 30)) + '&deg; / s');
}





function start_animation ()
{

	setInterval(function () {

		//spin gyro and render scene
		//gyro.rotation.y += 0.1;
		//debug('render');

		gyro.rotation.x -= 1;
		gimbal_inner.rotation.y += to_radians(inner_rate);
		gimbal_outer.rotation.x += to_radians(outer_rate);

		renderer.render(scene, camera);

	}, 33);

}





function to_radians (ang)
{
	return (ang / 180.0) * Math.PI;
}
