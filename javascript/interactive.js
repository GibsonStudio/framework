
/* **** drag and drop **** */

// v1.0 29/11/2016
// Jon Williams



//the objects array is used to track the current position of each object
var objects = new Array();

//the correct array defines the correct 'target' location for each 'source' object
var correct = new Array();

//the selected object - used to make work on touch devices
var selected = '';




function add_object (object)
{

	var object 				= object || {};
	var text					= object.text || '';
	var id					= object.id || 'object_' + objects.length;
	var type				= object.type || 'source';
	var selected			= object.selected || false;
	var extra_class		= object.extra_class || '';
	var style				= object.style || '';

	var html = '<div id="' + id + '" draggable="true" ondragstart="dragstart(event)" ondragend="dragend(event)" ';
	html += 'ondragleave="dragleave(event)" ondrop="drop(event)" ondragover="dragover(event)"';
	html += ' onclick="dragclick(event)"';
	html += ' class="object ' + type + ' ' + extra_class + '" style="' + style + '">';

	html += text;

	html += '</div>';

	//add object to objects array
	var me = {};
	me.id = id;
	me.position = id;
	me.type = type;
	me.selected = selected;
	objects.push(me);

	return document.write(html);

}


function dragclick (e)
{

	var clicked_id = e.target.id;
	var i = get_object_index_from_id(clicked_id);
	var object = objects[i];

	if (object.id == selected) {

		//deselect object
		selected = '';
		$('#' + object.id).removeClass('being_dragged');

	} else if (selected == '') {

		//select object
		selected = object.id;
		$('#' + object.id).addClass('being_dragged');

	} else {

		//swap objects

		//remove classes
		$('#' + selected).removeClass('being_dragged');
		$('#' + object.id).removeClass('being_dragged');
		$('#' + selected).removeClass('correct');
		$('#' + object.id).removeClass('correct');

		//swap html
		var source_html = $('#' + selected).html();
		var dest_html = $('#' + object.id).html();
		$('#' + selected).html(dest_html);
		$('#' + object.id).html(source_html);

		//update objects
		swap_object_positions(selected, object.id);

		selected = '';

	}

}


function dragstart (e)
{
	e.dataTransfer.setData('Text', e.target.id);
	$('#' + e.target.id).addClass('being_dragged');
}



function dragend (e)
{
	e.preventDefault();
	$('#' + e.target.id).removeClass('being_dragged');
}


function drop (e)
{

	e.preventDefault();

	//remove any selection
	$('#' + selected).removeClass('being_dragged');
	selected = '';

	var grabbedid = e.dataTransfer.getData('Text');
	var droppedid = e.target.id;

	$('#' + droppedid).removeClass('over');
	$('#' + grabbedid).removeClass('being_dragged');
	$('#' + grabbedid).removeClass('correct');
	$('#' + droppedid).removeClass('correct');

	var grabbed = document.getElementById(grabbedid);
	var dropped = document.getElementById(droppedid);

	var grabbed_html = grabbed.innerHTML;

	grabbed.innerHTML = dropped.innerHTML;
	dropped.innerHTML = grabbed_html;

	//update objects
	swap_object_positions(grabbedid, droppedid);
	}


function dragleave (e)
{
	e.preventDefault();
	$('#' + e.target.id).removeClass('over');
}


function dragover (e)
{
	e.preventDefault();
	$('#' + e.target.id).addClass('over');
}



/*
function debug_button ()
{
	debug_objects();
}
*/


function add_drag_drop_ui (include_output)
{

	if (include_output) {
		include_ouput = 1;
	}

	var html = '<div style="text-align: center;">';

	html += '<button class="button" onclick="drag_drop_submit()">Submit</button>';

	if (include_output != 0) {
		html += '<div id="drag_drop_output"></div>';
	}

	html += '</div>';

	document.write(html);

}




function drag_drop_submit ()
{

	var score = 0;
	var max_score = correct.length;

	for (var i = 0; i < correct.length; i++) {

		if (Array.isArray(correct[i][1])) {

			if (correct[i][1].indexOf(get_object_position(correct[i][0])) >= 0) {
				score++;
				$('#' + get_object_position(correct[i][0])).addClass('correct');
			}

		} else {

			if (get_object_position(correct[i][0]) == (correct[i][1])) {
				score++;
				$('#' + correct[i][1]).addClass('correct');
			}

		}

	}

	if (score == max_score) {
		run_if_exists('interactivity_submission_ok');
	}

	if (score != max_score) {
		run_if_exists('interactivity_submission_fail');
	}

	$('#drag_drop_output').html('You scored ' + score + '/' + max_score);
}





function drag_drop_submit_OLD ()
{

	var score = 0;
	var max_score = correct.length;

	for (var i = 0; i < correct.length; i++) {

		if (get_object_position(correct[i][0]) == (correct[i][1])) {
			score++;

			$('#' + correct[i][1]).addClass('correct');

		}

	}

	if (score == max_score) {
		run_if_exists('interactivity_submission_ok');
	}

	if (score != max_score) {
		run_if_exists('interactivity_submission_fail');
	}

	$('#drag_drop_output').html('You scored ' + score + '/' + max_score);
}





function run_if_exists(function_name)
{

	fn = window[function_name];
	function_exists = typeof fn === 'function';

	if (function_exists)
		fn();

}






// **** object logic ****//


function get_object_index_from_id (id)
{

	var index = -1;

	for (var i = 0; i < objects.length; i++) {

		if (objects[i].id == id) {
			index = i;
			break;
		}

	}

	return index;

}


function get_object_position (id)
{

	var position = '';

	for (var i = 0; i < objects.length; i++) {

		if (objects[i].id == id) {
			position = objects[i].position;
			break;
		}

	}

	return position;

}



function get_object_index_in_position (position)
{

	index = -1;

	for (var i = 0; i < objects.length; i++) {

		if (objects[i].position == position) {
			index = i;
			break;
		}

	}

	return index;

}



function swap_object_positions (position1, position2)
{

	var index1 = get_object_index_in_position(position1);
	var index2 = get_object_index_in_position(position2);

	var ob1 = objects[index1];
	var ob2 = objects[index2];
	var position1 = ob1.position;
	var position2 = ob2.position;
	ob1.position = position2;
	ob2.position = position1;

	objects[index1] = ob1;
	objects[index2] = ob2;

}



function debug_objects ()
{

	for (var i = 0; i < objects.length; i++) {

		var object = objects[i];

		debug('----object: ' + object.id);

		for (key in object) {

			debug(key + ': ' + object[key]);

		}

		debug('');

	}

}



















/* **** drop down: choose the correct word **** */

function check_select (selectid, correct_val)
{

	var id = '#' + selectid;

	var val = $(id).val();

	if (val == '') {
		$(id).removeClass('select_wrong');
		$(id).removeClass('select_correct');
	} else if (val == correct_val) {
		$(id).removeClass('select_wrong');
		$(id).addClass('select_correct');
	} else {
		$(id).removeClass('select_correct');
		$(id).addClass('select_wrong');
	}

}






/* **** answer boxes **** */

function indicate_correct ()
{

	$('#answer').addClass('select_correct');
	$('#answer').removeClass('select_wrong');
	$('#output').html('&check;');

}





function indicate_wrong ()
{

	$('#answer').addClass('select_wrong');
	$('#answer').removeClass('select_correct');
	$('#output').html('&cross;');

}








/* **** numbers **** */

function get_random_number (min, max, step)
{

	var step = step || 1;

	var range = max - min;
	var num = min + (Math.random() * range);
	num = round_number(num, step);

	return num;

}



function round_number (num, nearest)
{

	var factor = 1 / nearest;
	var result = Math.round(num * factor) / factor;

	return result;

}


function randomize_array (my_array)
{

	//takes an array, shuffles elements and returns randomized array
	var random_loops = my_array.length * 5;

	for (var i = 0; i < random_loops; i++) {

		var index_1 = Math.floor(Math.random() * my_array.length);
		var index_2 = Math.floor(Math.random() * my_array.length);

		var el_1 = my_array[index_1];
		var el_2 = my_array[index_2];

		my_array[index_1] = el_2;
		my_array[index_2] = el_1;

	}

	return my_array;

}






/* **** drag divs (requires jquery-UI) **** */

function ini_drag_objects ()
{

	//var zindex = 0;

	selected = '';

	for (var i = 0; i < drag_ids.length; i++) {

		var obj = {};
		obj.id = drag_ids[i];
		obj.top = null;
		obj.left = null;
		//obj.zindex = zindex;
		drag_objects.push(obj);

		//zindex++;

	}

}



function ini_drag ()
{

	for (var i = 0; i < drag_objects.length; i++) {

		var obj = drag_objects[i];

		//$('#' + obj.id).bind('mousedown', function (e) {
		//	bring_to_top(e);
		//});

		$('#' + obj.id).draggable().click(function(e) {
			obj.top = e.pageY - $('#' + obj.id).position().top;
			obj.left = e.pageX - $('#' + obj.id).position().left;
			return false;
		});

	}

}





function bring_to_top (e)
{

	var element = e.target || e.srcElement;
	var div_id = get_parent_div(element.id);
	var obj_index = get_object_index_by_id(div_id);
	var obj = drag_objects[obj_index];

	obj.zindex = drag_objects.length;
	drag_objects[obj_index] = obj;

	//set z index in objects array
	for (var i = 0; i < drag_objects.length; i++) {

		var this_obj = drag_objects[i];

		if (this_obj.id != obj.id) {

			this_obj.zindex = this_obj.zindex - 1;
			drag_objects[i] = this_obj;

		}

	}

	//set z index of elements
	for (var i = 0; i < drag_objects.length; i++) {

		var obj = drag_objects[i];
		$('#' + obj.id).css('z-index', obj.zindex);

	}

}



function get_object_by_id (object_id)
{

	for (var i = 0; i < drag_objects.length; i++) {

		var obj = drag_objects[i];

		if (obj.id == object_id) {
			return obj;
		}

	}

	return {};

}



function get_object_index_by_id (object_id)
{

	var index = 0;

	for (var i = 0; i < drag_objects.length; i++) {

		var obj = drag_objects[i];

		if (obj.id == object_id) {
			index = i;
		}

	}

	return index;

}







function get_parent_div (id)
{

	var return_val  = id;

	if (drag_ids.indexOf(id) <= -1) {

		//find parent in drag_ids

		$('#' + id).parents().each(function () {

			var parent_id = $(this).attr('id');

			if (drag_ids.indexOf(parent_id) > -1) {
				return_val = parent_id;
			}

		});

	}

	return return_val;

}






/* ******** bar graphs ******** */

	function add_bar_graph ( args )
	{

		var args 				= args || {};
		var id					= args['id'] || 'bar_graph';
		var height				= args['height'] || '400px';
		var width				= args['width'] || '100px';
		var left					= args['left'] || '';
		var top					= args['top'] || '';
		var right				= args['right'] || '';
		var bottom				= args['bottom'] || '';
		var border				= args['border'] || '1px solid #333333';
		var color				= args['color'] || '#e2e2e2';
		var ini_value			= args['ini_value'] || 0;
		var include_value	=	args['include_value'] || false;

		var style='position:absolute; width:' + width + '; height:' + height + '; border:' + border + '; overflow:hidden;';

		if (left) { style += 'left:' + left + '; '; }
		if (right) { style += 'right:' + right + '; '; }
		if (top) { style += 'top:' + top + '; '; }
		if (bottom) { style += 'bottom:' + bottom + '; '; }

		var bar_style = 'position:absolute; left:0px; bottom:0px; width: 100%; height:' + ini_value + '%; background:' + color + ';';

		var html = '<div id="' + id + '_container" style="' + style + '">';
		html += '<div id="' + id + '" style="' + bar_style + '"></div>';

		if (include_value) {
			html += '<div id="' + id + '_value" style="text-align:center; position:absolute; left:0px; bottom:8px; width:' + width + '; font-weight: bold; font-size: 14px;">' + ini_value + '%</div>';
		}

		html += '</div>';

		document.write(html);

	}

	function set_bar_graph ( percent, args )
	{

		args = args || {};
		id = args['id'] || 'bar_graph';
		$('#' + id).css({ height: percent + '%' });
		$('#' + id + '_value').html( percent.toFixed(0) + '%');

	}
