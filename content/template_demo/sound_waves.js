

var my_timeout;
var frame_rate = 30;
var wave_speed = 4;
var my_audio;

//wave 1
var wave_1_active = false;
var wave_1_x = 0;
var wave_1_loop = 140;

//wave 2
var wave_2_active = false;
var wave_2_x = 0;
var wave_2_loop = 42;


$(document).ready(function () {

	//mouse events
	document.getElementById('wave_1').addEventListener('mousedown', function (e) { start_wave_1(e); });
	document.getElementById('wave_2').addEventListener('mousedown', function (e) { start_wave_2(e); });
	document.body.addEventListener('mouseup', function (e) { stop_waves(e); });
	
	
	//touch events
	document.body.addEventListener('touchend', function (e) { stop_waves(e); });
	document.body.addEventListener('touchcancel', function (e) { stop_waves(e); });
	document.getElementById('wave_1').addEventListener('touchstart', function (e) { start_wave_1(e); });
	document.getElementById('wave_2').addEventListener('touchstart', function (e) { start_wave_2(e); });
	
});



function start_wave_1 (e)
{
	e.preventDefault();
	wave_1_active = true;
	my_audio = document.getElementById('my_audio');
	my_audio.src = 'sound_waves/16000Hz.mp3';
	my_audio.play();
	my_audio.loop = true;
}



function stop_wave_1 (e)
{
	wave_1_active = false;
}


function start_wave_2 (e)
{
	e.preventDefault();
	wave_2_active = true;
	my_audio = document.getElementById('my_audio');
	my_audio.src = 'sound_waves/40Hz.mp3';
	my_audio.play();
	my_audio.loop = true;
}



function stop_wave_2 (e)
{
	wave_2_active = false;
}


function stop_waves ()
{
	my_audio = document.getElementById('my_audio');
	my_audio.pause();
	my_audio.src = '';
	stop_wave_1();
	stop_wave_2();
}




function ini_scene ()
{		
	my_timeout = setInterval(run_animation, (1000 / frame_rate) );	
}



function run_animation ()
{

	//wave_1
	if (wave_1_active) {
	
		wave_1_x += wave_speed;
		
		while (wave_1_x > wave_1_loop) {
			wave_1_x -= wave_1_loop;
		}
			
		$('#wave_1').css({ 'background-position': -wave_1_x + 'px 0px' });
		
	}

	//wave_2
	if (wave_2_active) {
	
		wave_2_x += wave_speed;
		
		while (wave_2_x > wave_2_loop) {
			wave_2_x -= wave_2_loop;
		}
			
		$('#wave_2').css({ 'background-position': -wave_2_x + 'px 0px' });
		
	}
	
}












