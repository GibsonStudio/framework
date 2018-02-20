



function ini_vars ()
{
	
	add_drag_object('angle_1', 'box_reflex');
	add_drag_object('angle_2', 'box_acute');
	add_drag_object('angle_3', 'box_right');

	add_drag_object('angle_4', 'box_obtuse');
	add_drag_object('angle_5', 'box_reflex');
	add_drag_object('angle_6', 'box_obtuse');
	
	add_drag_object('angle_7', 'box_acute');
	add_drag_object('angle_8', 'box_right');
	add_drag_object('angle_9', 'box_acute');
	
	ini_drag_events();	
	
}






function toggle_definitions ()
{

	$('#definitions').toggle();
	
}






