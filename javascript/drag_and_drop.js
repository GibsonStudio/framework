

//Jon Williams
//Last updated: 11/5/2016


//vars for JS drag and drop
var drag_objects = [];
var active = false;
var clicked_element = '';
var offset_x = 0;
var offset_y = 0;





/* ******** drag and drop JS - for touch devices */


function add_drag_object (id, correct_target, args)
{

	var args = args || {};
	
	me = {};
	me.id = id;
	me.target = correct_target;
	me.x = $('#' + id).css('left');
	me.y = $('#' + id).css('top');
	me.active = true;
	
	//optional args
	me.snap_x = args.snap_x || false;
	me.snap_y = args.snap_y || false;
	me.snap_drop_zone = args.snap_drop_zone || false;
	me.drop_zone_offset_x = args.drop_zone_offset_x || 0;
	me.drop_zone_offset_y = args.drop_zone_offset_y || 0;	
	me.snap_to_origin = args.snap_to_origin == false ? false : true;
	me.script_correct = args.script_correct || '';
	me.script_wrong = args.script_wrong || '';
	
	drag_objects.push(me);
	return true;
}
	



function dropped_on_correct_target (clicked_element)
{
	var cx = $('#' + clicked_element).offset().left + ($('#' + clicked_element).width() / 2);
	var cy = $('#' + clicked_element).offset().top + ($('#' + clicked_element).height() / 2);
	
	var me = drag_objects[get_object_index_by_id(clicked_element)];
	var correct_target = me.target;
	
	var tx = $('#' + correct_target).offset().left;
	var ty = $('#' + correct_target).offset().top;
	var tx2 = tx + $('#' + correct_target).width();
	var ty2 = ty + $('#' + correct_target).height();
	
	if (cx >= tx && cx <= tx2 && cy >= ty && cy <= ty2) {
		return true;
	}
	
	return false;
}






function is_drag_element (id)
{
	
	for (var i = 0; i < drag_objects.length; i++) {
		if (drag_objects[i].id == id) return true;
	}
	
	return false;
	
}







function get_object_index_by_id (id)
{
	
	for (var i = 0; i < drag_objects.length; i++) {
		if (drag_objects[i].id == id) return i;
	}
	
	return -1;
	
}








function start_event (e)
{	
	
	//get clicked on element
	clicked_element = e.target.id;
	var me = drag_objects[get_object_index_by_id(clicked_element)] || false;	
	
	//has an active_element been clicked on and is it active?
	if (!is_drag_element(clicked_element) || !me.active) {
		return false;
	}
	
	var ePageX = e.pageX || e.touches[0].pageX;
	var ePageY = e.pageY || e.touches[0].pageY;
	
	offset_x = ePageX - $('#' + clicked_element).offset().left;
	offset_y = ePageY - $('#' + clicked_element).offset().top;
	
	active = true;

}



function stop_event (e)
{
	
	var me = drag_objects[get_object_index_by_id(clicked_element)];
	
	if (!me.active) return false;
	
	var correct = false;
	
	if (me.target) {
		correct = dropped_on_correct_target(clicked_element);
	}	
	
	if (correct) {		
		
		$('#' + clicked_element).addClass('deactivated');
		me.active = false;
		
		//move to snap position?
		if (me.snap_x) $('#' + clicked_element).css({ left: me.snap_x });
		if (me.snap_y) $('#' + clicked_element).css({ top: me.snap_y });
		
		//snap to drop zone
		if (me.snap_drop_zone) {
			
			var x = $('#' + me.target).offset().left - $('#my_container').offset().left + me.drop_zone_offset_x;
			$('#' + clicked_element).css({ left: x });
			
			var y = $('#' + me.target).offset().top - $('#my_container').offset().top + me.drop_zone_offset_y;
			$('#' + clicked_element).css({ top: y });

		}
		
		//run code?
		eval(me.script_correct);
		
	} else {
		
		//move back to position?
		if (me.snap_to_origin) {
			$('#' + clicked_element).css({left: me.x});
			$('#' + clicked_element).css({top: me.y});
		}
		
		//run code?
		eval(me.script_wrong);
		
	}
	
	clicked_element = '';
	active = false;
	
}












function move_event (e)
{	

	if (!active) return false;
	
	var ePageX = e.pageX || e.touches[0].pageX;
	var ePageY = e.pageY || e.touches[0].pageY;

	$('#' + clicked_element).css({ left: ePageX - $('#my_container').offset().left - offset_x }); // - ($('#' + clicked_element).width() / 2) });
	$('#' + clicked_element).css({ top: ePageY - $('#my_container').offset().top - offset_y }); // - ($('#' + clicked_element).height() / 2) });
			
}






function ini_drag_events ()
{

	//mouse events	
	document.body.addEventListener('mousemove', function (e) { move_event(e); });
	document.body.addEventListener('mouseup', function (e) { stop_event(e); });
	document.body.addEventListener('mousedown', function (e) { start_event(e); });
	
	//touch events
	document.body.addEventListener('touchstart', function (e) { start_event(e); });
	document.body.addEventListener('touchend', function (e) { stop_event(e); });

	document.body.addEventListener('touchmove', function (e) {
		
		e.preventDefault();
		
		if (e.targetTouches.length == 1) {
			var touch = e.targetTouches[0];
			move_event(touch);
		} 
		
	});
	
}



