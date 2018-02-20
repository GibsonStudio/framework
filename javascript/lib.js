// v1.1  15/11/2016
// JW



// **** constants (file paths) **** //

function root_path ()
{
	return '../../';
	//return 'http://localhost/cbt/';
}


function script_path ()
{
	return root_path() + 'javascript/';
}


function image_path ()
{
	return root_path() + 'images/';
}


function css_path ()
{
	return root_path() + 'css/';
}






// **** html generation **** //

function write_head ()
{
	h = '<meta name="format-detection" content="telephone=no">';
	h += '<script src="' + script_path() + 'jquery-1.11.2.min.js" type="text/javascript"></script>';
	h += '<script src="ini_lesson.js" type="text/javascript"></script>';
	h += '<link href="' + css_path() + 'main.css" type="text/css" rel="stylesheet" />';
	document.write(h);

}


function write_header ()
{

	h = '<div id="header">';
	h += '<div id="header-logo" style="background:url(' + image_path() + 'main-logo.png)"></div>';
	h += '<div id="header-title">' + lesson_title + '</div>';
	h += '<div id="page-number-container">';

	current_url = window.location.toString();
	current_scene = current_url.substr(current_url.lastIndexOf("/") + 1);
	current_scene_number = get_scene_number(current_scene, my_scenes) + 1;

	h += '<span id="page-number">' + current_scene_number + ' / ' + my_scenes.length + '</span>';
	h += '</div>';

	h += '<div id="controls">';

	//nav button
	h += '<div class="control_button" id="nav_button" onClick="button_nav()"><img src="' + image_path() + 'nav.png" alt="Nav" title="Nav" /></div>';

	//back button
	h += '<div class="control_button" id="button_back" onClick="button_back()"><img src="' + image_path() + 'back.png" alt="Back" title="Back" /></div>';

	//next button
	h += '<div class="control_button" id="button_next" onClick="button_next()"><img src="' + image_path() + 'next.png" alt="Next" title="Next" /></div>';

	h += '</div>';

	h += '</div>';

	document.write(h);

	write_amendment_logger();

}



function write_menu_header ()
{

	h = '<div id="header">';
	h += '<div id="header-logo" style="background:url(' + image_path() + 'main-logo.png)"></div>';
	h += '<div id="header-title">Main Menu</div>';
	h += '</div>';

	document.write(h);

}



function include_css (css)
{
	var html = '<link href="' + css_path() + css + '" type="text/css" rel="stylesheet" />';
	document.write(html);
}


function include_javascript (script)
{
	var html = '<script src="' + script_path() + script + '" type="text/javascript"></script>';
	document.write(html);
}


function include_interactive ()
{
	var html = '<script src="' + script_path() + 'interactive.js" type="text/javascript"></script>';
	html += '<link href="' + css_path() + 'interactive.css" type="text/css" rel="stylesheet" />';
	document.write(html);
}


function include_jquery_rotate ()
{
	var html = '<script src="' + script_path() + 'jQueryRotate.2.2.js" type="text/javascript"></script>';
	document.write(html);
}


function include_jquery_ui ()
{
	var html = '<script src="' + script_path() + 'jquery-ui.min.js" type="text/javascript"></script>';
	document.write(html);
}


function include_threejs ()
{
	var html = '<script src="' + script_path() + 'three.min.js" type="text/javascript"></script>';
	html += '<script src="' + script_path() + 'ColladaLoader.js" type="text/javascript"></script>';
	//html += '<script src="' + script_path() + 'OrbitControls.js" type="text/javascript"></script>';
	document.write(html);
}


function include_raphael ()
{
	var html = '<script src="' + script_path() + 'raphael-min.js" type="text/javascript"></script>';
	html += '<script src="' + script_path() + 'raphael-path-anim-helper.js" type="text/javascript"></script>';
	document.write(html);
}




function write_nav ()
{

	h = '<div id="nav">';

	h += '<div class="nav_title">' + lesson_title + '</div>';


	h += '<ol>';

	for (var i = 0; i < my_scenes.length; i++)
	{
		h += '<li><a href="' + my_scenes[i][0] + '">' + my_scenes[i][1] + '</a></li>';
	}

	h += '</ol></div>';

	document.write(h);

}




function write_debug ()
{

	h = '<div id="debug">';
	h += '<b>Debug Output</b><hr />';
	h += '</div>';

	document.write(h);

}




function add_audio (filename, args)
{

	var args = args || {};
	var id = args.id || 'my_audio';
	var classes = args.classes || '';
	var style = args.style || '';

	//args that default to true need to be handled differently
	var controls = true;
	if (args.controls == false) { controls = false; }

	var autoplay = true;
	if (args.autoplay == false) { autoplay = false; }

	var onended = true;
	if (args.onended == false) { onended = false; }

	var html = '<audio id="' + id + '"';

	// add style?
	if (style) { html += ' style="' + style + '"'; }

	//add classes
	html += ' class="' + classes + '"';

	if (autoplay) { html += ' autoplay'; }
	if (controls) { html += ' controls'; }
	if (onended) { html += ' onended="media_finished()"'; }

	html += '>';

	html += '<source src="' + filename + '.mp3" type="audio/mpeg" />';
	html += 'Your browser does not support HTML5 audio.';
	html += '</audio>';

	document.write(html);

}



function add_video (filename, args)
{

	var args = args || {};
	var id = args.id || 'my_video';
	var poster = args.poster || false;
	var width = args.width || false;
	var height = args.height || false;
	var classes = args.classes || '';
	var style = args.style || '';
	var loop = args.loop || '';

	//args that default to true need to be handled differently
	var controls = true;
	if (args.controls == false) { controls = false; }

	var autoplay = true;
	if (args.autoplay == false) { autoplay = false; }

	var fullscreen = true;
	if (args.fullscreen == false) { fullscreen = false; }

	var onended = true;
	if (args.onended == false) { onended = false; }

	var html = '';

	if (fullscreen)
	{
		html += '<style>html, body  { height: 100%; overflow: hidden; } </style>';
		html += '<div class="fullscreen_container">';
	}


	html += '<video id="' + id + '"';


	// add style?
	if (style) { html += ' style="' + style + '"'; }

	//add classes
	html += ' class="' + classes;
	if (fullscreen) { html += 'video_scale'; }
	html += '"';

	//add attributes?
	if (width) { html += ' width="' + width + '"'; }
	if (height) { html += ' height="' + height + '"'; }
	if (autoplay) { html += ' autoplay'; }
	if (controls) { html += ' controls'; }
	if (loop) { html += ' loop'; }
	if (poster) { html += ' poster="' + poster + '"' ;}
	if (onended) { html += ' onended="media_finished()"'; }

	html += '>';
	html += '<source src="' + filename + '.mp4" type="video/mp4">';
	html += '</video>';

	document.write(html);


	if (fullscreen) { html += '</div>'; }

}






function media_finished ()
{

	$('#button_next').html('<img src="../../images/next_highlite.png" alt="Next" title="Next">');

}




function pause_media ()
{
	var media = document.getElementById('my_video') || document.getElementById('my_audio');

	if (media.paused) {
		media.play();
	} else {
		media.pause();
	}

}






/* **** useful functions **** */

function get_url_param (param, def)
{

	var return_val = def || '';

	var params = window.location.search.substring(1);
	params = params.split('&');

	for (var i = 0; i < params.length; i++) {

		var this_param = params[i].split('=');

		if (this_param[0] == param) {
			return this_param[1];
		}

	}

	return def;

}





/* **** debug **** */

function debug (message) {

	var db = document.getElementById("debug");
	db.innerHTML += message + "<br />";
	db.scrollTop = db.scrollHeight;

}












// **** buttons **** //

function button_nav ()
{
	$('#nav').slideToggle();
}


function button_back ()
{

	//get currently loaded scene
	current_url = window.location.toString();
	current_scene = current_url.substr(current_url.lastIndexOf("/") + 1);

	//get the current scene number (its position in my_scenes array)
	current_scene_number = get_scene_number(current_scene, my_scenes);

	//go previous scene
	target_scene_number = current_scene_number - 1;

	if (target_scene_number < 0) {

		target_scene_number = 0;

	} else {

		window.location.href = my_scenes[target_scene_number][0];

	}

}


function button_next ()
{

	//get currently loaded scene
	current_url = window.location.toString();
	current_scene = current_url.substr(current_url.lastIndexOf("/") + 1);

	//get the current scene number (its position in my_scenes array)
	current_scene_number = get_scene_number(current_scene, my_scenes);

	//go next scene
	target_scene_number = current_scene_number + 1;

	if (target_scene_number > (my_scenes.length - 1)) {

		target_scene_number = my_scenes.length - 1;

	} else {

		window.location.href = my_scenes[target_scene_number][0];

	}


}





function keyboard_shortcuts (e)
{

	var key = e.keyCode;

	switch (key) {

		case 37:
			button_back();
			break;
		case 39:
			button_next();
			break;
		case 80:
			pause_media();
			break;
		case 16:
			if (e.ctrlKey) { $('#amendment_logger').slideToggle(); }
			break;
		case 123:
			//stop F12
			break;
		default:
			//debug(key);

	}

}






//**** lesson logic ****//


function scene_loaded ()
{

	/*
	//stop right-click
	$(document.body).bind('contextmenu', function() { return false; });

	//stop F12 debug
	$(document).keydown(function(event) {
		if (event.keyCode == 123) {
			return false;
		}
		else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
			return false;  //Prevent from ctrl+shift+i
		}
	});
	*/

	current_scene_number = current_scene_number || 0;

	//dim buttons
	if (current_scene_number <= 1) 	{
		$('#button_back').addClass('control_button_faded');
	}

	if (current_scene_number >= my_scenes.length) {
		$('#button_next').addClass('control_button_faded');
	}


	//add key listener
	window.addEventListener('keydown', keyboard_shortcuts, false);


	//start audio listerner?
	if (typeof frames !== 'undefined') {

		if (frames.length > 0)
		{

			set_up_audio_events();
			show_frame(0);

		}

	}


}



function get_scene_number (c_scene, scene_array) {

	pos = 0;

	for (var i = 0; i < scene_array.length; i++) {

		if (scene_array[i][0] == c_scene) {
			pos = i;
		}

	}

	return pos;

}















//**** sync to audio ****//


function set_up_audio_events () {

	var my_audio = document.getElementById("my_audio");

	if (my_audio)
	{

		my_audio.addEventListener("timeupdate", function () {

			t = my_audio.currentTime;

			var my_frame = get_frame_from_time(t);

			if (my_frame != current_frame) {

				show_frame(my_frame);

			}

		}, false);

	}

}




function get_object_max () {

	var object_max = 0;

	for (var i = 0; i < frames.length; i++) {

		var objects = frames[i][1];

		for (var j = 0; j < objects.length; j++) {

			if (objects[j] > object_max) {
				object_max = objects[j];
			}

		}

	}

	return object_max;

}




function show_frame (f) {

	current_frame = f;
	var object_array = frames[f][1];
	var function_array = frames[f][2];

	//objects
	for (var i = 0; i <= get_object_max(); i++) {

		if (is_in_array(i, object_array)) {
			show_element("object_" + i);
		} else {
			hide_element("object_" + i);
		}

	}

	//run any functions?
	if (function_array) {

		for (var i = 0; i < function_array.length; i++) {

			eval(function_array[i]);

		}

	}

}




function show_element (my_element) {
	$('#' + my_element).show();
}



function hide_element (my_element) {
	$('#' + my_element).hide();
}





function get_frame_from_time (t) {

	var frame = 0;

	for (var i = 0; i < frames.length; i++) {

		if (i == frames.length - 1) {

			//check last frame
			var frame_start = frames[i][0];

			if (t >= frame_start) {

				frame = i;
				break;

			}

		} else {

			//check all other frames
			var frame_start = frames[i][0];
			var frame_end = frames[i + 1][0];

			if ((t >= frame_start) && (t < frame_end)) {

				frame = i;
				break;

			}

		}

	}

	return frame;

}




function is_in_array( value, array ) {

	r = false;

	for (var i = 0; i < array.length; i++) {

		if (value == array[i]) {
			r = true;
		}

	}

	return r;

}




function to_degrees (ang)
{
  return (ang / Math.PI) * 180;
}


function to_radians (ang)
{
	return (ang / 180) * Math.PI;
}





/* ******** summary tabs ******** */

function show_summary_tab (tab_index)
{

	//hide all
	for (var i = 1; i <= 4; i++) {
		$('#summary_tab_' + i).hide();
		$('#summary_tab_button_' + i).removeClass('summary_tab_button_active');
	}

	//show required tab
	$('#summary_tab_' + tab_index).show();
	$('#summary_tab_button_' + tab_index).addClass('summary_tab_button_active');

}





/* ******** manuals ******** */

function add_figure (filename, args)
{

	var args 			= args || {};
	var position		= args.position || 'center';
	var number		= args.number || '';
	var caption		= args.caption || '';
	var width			= args.width || 600;
	var height		= args.height || '';

	var html = '<div class="figure figure_' + position + '" style="';
	if (width != '') { html += ' width:' + width + 'px;"'; }
	html += '">';
	html += '<img src="' + filename + '" alt="' + filename + '" ';

	if (width != '') { html += ' width="' + width + '"'; }
	if (height != '') { html += ' height="' + height + '"'; }

	html += '/>';

	if (number != '') {
		html += '<div class="figure_caption">Figure ' + number + ' ' + caption + '</div>';
	}

	html += '</div>';

	document.write(html);

}







/* ******** amendment logger ******** */

function write_amendment_logger ()
{

	var tester = read_cookie('amendment_tester') || '';

	var html = '<div id="amendment_logger">';

	html += '<div class="amendment_heading">Amendment:</div>';

	html += '<table style="width:100%;">';

	html += '<tr><td class="amendment_field_title">Tester:</td><td><input id="amendment_tester" style="width:99%;" value="' + tester + '" /></td></tr>';

	html += '<tr><td class="amendment_field_title">Type:</td><td><select id="amendment_type">';
	html += '<option value="0">Default</option>';
	html += '<option value="1">Audio</option>';
	html += '<option value="2">Graphic</option>';
	html += '<option value="3">Text</option>';
	html += '</select></td></tr>';

	html += '<tr><td class="amendment_field_title">God Mode:</td><td><input id="amendment_password" type="password" value="" /></td></tr>';

	html += '<tr><td colspan="2" class="amendment_field_title">Comment:</td></tr>';
	html += '<tr><td colspan="2"><textarea id="amendment_comment" style="width:98%; height: 140px;" onkeydown="event.stopPropagation();"></textarea></td></tr>';

	html += '<tr><td colspan="2"><button class="button" style="width:100%;" onclick="save_comment()">Save</button></td></tr>';

	html += '</table>';

	html += '</div>';

	document.write(html);

}



function save_comment ()
{

	//check fields are not blank
	if ($('#amendment_tester').val() == '') { alert('Tester cannot be blank.'); return; }
	if ($('#amendment_comment').val() == '') { alert('Comment cannot be blank.'); return; }

	//save info in cookies
	create_cookie('amendment_tester', $('#amendment_tester').val());

	var amendment_url = 'http://amendments.oxfordinteractive.com/index.php/amendment/add';

	var approved = 0;
	if ($('#amendment_password').val() == 'gibson') { approved = 1; }

	var my_data = [
		['author', $('#amendment_tester').val()],
		['comment', $('#amendment_comment').val()],
		['url', window.location.toString()],
		['filename', window.location.toString()],
		['frame', current_scene_number],
		['approved', approved],
		['type', $('#amendment_type').val()]
	];

	var form = document.createElement('form');
	form.setAttribute('method', 'POST');
	form.setAttribute('action', amendment_url);
	form.setAttribute('target', 'amendment_form');

	for (i in my_data) {
		var input = document.createElement('input');
		input.type = 'hidden';
		input.name = my_data[i][0];
		input.value = my_data[i][1];
		form.appendChild(input);
	}

	document.body.appendChild(form);

	window.open('', 'amendment_form', 'width=730,height=345,resizable=yes,scrollbars=yes');

    form.submit();

    document.body.removeChild(form);

}


function create_cookie (name, value)
{

	var days = 100;
	var date = new Date();
	date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	var expires = "; expires=" + date.toGMTString();

    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/;";

}


function read_cookie (name)
{

	var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }

    return null;

}





/* ******** interactive bullet lists ******** */

function bullet_show (bullet_id, my_code)
{

  $('#bullet-' + bullet_id).show();
  $('#button-' + bullet_id).addClass('bullet-revealled');

	if (my_code) { eval(my_code); }

}



function add_bullets (my_bullets)
{

	html = '<div class="bullet-instructions">(Click each bullet point to reveal)</div>';
	html += '<table class="reveal-bullets">';

	for (var i = 0; i < my_bullets.length; i++) {
		var bullet_text = my_bullets[i];
		var my_code = '';
		if (Array.isArray(my_bullets[i])) {
			bullet_text = my_bullets[i][0];
			my_code = my_bullets[i][1];
		}
		html += '<tr>';
		html += '<td><div class="bullet-number noselect" id="button-' + i + '" onclick="bullet_show(' + i + ',\'' + my_code + '\');">' + (i + 1) + '</div></td>';
		html += '<td><div class="bullet-text hidden" id="bullet-' + i + '">' + bullet_text + '</div></td>';
		html += '</tr>';
	}

	html += '</table>';

	document.write(html);

}
