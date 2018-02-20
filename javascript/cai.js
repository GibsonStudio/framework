

var frame = 0;
var text_count = 50;
var graphics_count = 50;
var frame_states = [];



function ini_cai_lesson ()
{

	disable_button("cai_button_back");
	
	if (frame_states.length <= 0) {
		disable_button("cai_button_continue");
	}	
	
	window.addEventListener('keydown', cai_keyboard_shortcuts, false);
	
	add_title();
	
}





function cai_keyboard_shortcuts (e)
{
	
	var key = e.keyCode;
	
	switch (key) {
	
		case 32:
			cai_continue();
			break;
		case 66:
			cai_back();
			break;
		default:
			//debug(key);
			
	}
	
}







function add_title (txt)
{

	current_url = window.location.toString();
	current_scene = current_url.substr(current_url.lastIndexOf("/") + 1);
	
	//get the current scene number (its position in my_scenes array)
	current_scene_number = get_scene_number(current_scene, my_scenes);
	
	var title = lesson_title + ' <span style="font-weight: normal;">&bull; ' + (current_scene_number + 1) + ' &bull; ' + my_scenes[current_scene_number][1] + '</span>';	
	title = txt || title;
	
	$('#header-title').html(title);
	
}



function add_cai_controls ()
{

	var html = '';
	
	//left
	html += '<div class="cai_controls cai_controls_left">';
	
	html += '<img class="cai_button cai_button_back" onclick="cai_back()" src="' + image_path() + 'cai_back.png" alt="back" />';
	html += '<img class="cai_button cai_button_continue" onclick="cai_continue()" src="' + image_path() + 'cai_continue.png" alt="back" />';
	
	html += '</div>';
	
	//right
	html += '<div class="cai_controls cai_controls_right">';
	
	html += '<img class="cai_button cai_button_back" onclick="cai_back()" src="' + image_path() + 'cai_back.png" alt="back" />';
	html += '<img class="cai_button cai_button_continue" onclick="cai_continue()" src="' + image_path() + 'cai_continue.png" alt="back" />';
	
	html += '</div>';
	
	document.write(html);

}





// ////// button functions

function cai_continue ()
{	
	
	if (frame_states.length > 0) {
		enable_button('cai_button_back');
	}
	
	frame += 1;

	if (frame > frame_states.length - 1) {
		frame = frame_states.length - 1;
	} else {
		show_assets(frame);
	}

	//hide continue button?
	if (frame >= frame_states.length - 1) {
		disable_button('cai_button_continue');		
	}

	custom_frame();	
	
}




function cai_back ()
{
	
	if (frame_states.length > 0) {
		enable_button('cai_button_continue');
	}
	
	frame -= 1;
	
	if (frame < 0) {
		frame = 0;
	} else {
		show_assets(frame);
	}
	
	if (frame == 0) {
		disable_button('cai_button_back');		
	}
	
	custom_frame();
	
}





function enable_button (class_name) {
	
	$('.' + class_name).each(function () {
	
		//$(this).fadeTo(50, 1);
		$(this).css({opacity:1});
		
	});
	
}







function disable_button (class_name) {

	$('.' + class_name).each(function () {
	
		//$(this).fadeTo(50, 0.1);
		$(this).css({opacity:0.1});
		
	});

}



function show_element (my_element) {

	$('#' + my_element).show();
	
}



function hide_element (my_element) {

	$('#' + my_element).hide();
	
}



function show_assets () {
	
	if (frame_states.length > 0) {
	
		//show / hide text
		var text = frame_states[frame][0];
		
		for (var i = 0; i <= text_count; i++) {		
			
			if (is_in_array(i, text)) {
			
				show_element('text_' + i);
				
				
			} else {

				hide_element('text_' + i);
				
			}
					
		}
		
		
		
		//show / hide graphics
		var graphic = frame_states[frame][1];
		
		for (var i = 0; i <= graphics_count; i++) {
		
			if (is_in_array(i, graphic)) {
			
				show_element('graphic_' + i);
				
			} else {
			
				hide_element('graphic_' + i);
				
			}
			
		}
	
	}
	
}




/*
function is_in_array( value, array ) {

	r = false;
	
	for (var i = 0; i < array.length; i++) {
	
		if (value == array[i]) {
			r = true;
		}
		
	}
	
	return r;
	
}
*/




