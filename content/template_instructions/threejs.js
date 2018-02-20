
var scene;
var camera;
var renderer;
var dice;

function ini_3d ()
{

  var WIDTH = 400;
  var HEIGHT = 400;

  //set up scene and camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 45, WIDTH / HEIGHT, 0.1, 10000 );
  scene.add(camera);

  //set up renderer
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor('#f2f2f2', 1);
  renderer.setSize( WIDTH, HEIGHT );

  //add to DOM
  document.getElementById('my_3d_scene').appendChild(renderer.domElement);

  //load dice model with ColladaLoader
  var loader = new THREE.ColladaLoader();
  loader.load('collada_dice.dae', function (collada) {

    var dae = collada.scene;
    scene.add(dae);

    dice = scene.getObjectByName('dice');

    var blender_cam = scene.getObjectByName('blender_camera');
    camera.position.set(blender_cam.position.x, blender_cam.position.y, blender_cam.position.z);
    camera.rotation.set(blender_cam.rotation.x, blender_cam.rotation.y, blender_cam.rotation.z);

  });

  //spin dice and render scene
  setInterval(function () {

    dice.rotation.x += 0.01;
    dice.rotation.y += 0.017;
    dice.rotation.z -= 0.013;

    renderer.render(scene, camera);

  }, 33);

}
