
var anim_1, anim_2, anim_3;
 
function ini_animation ()
{

	ini_animation_1();
	ini_animation_2();
	ini_animation_3();
	
}



function start_all ()
{
	anim_1.start();
	anim_2.start();
	anim_3.start();
}



function pause_all ()
{
	anim_1.pause();
	anim_2.pause();
	anim_3.pause();
}





function ini_animation_1 ()
{

	//good take off
	
	anim_1 = new path_animation("anim_1");	
	anim_1.paper = Raphael("animation_1", 800, 300);
	
	anim_1.duration = 4000;
	
	//define path
	var p = "M40,186";
	p += "L250,186";
	p += "Q500,200,750,60";
	
	anim_1.path = anim_1.paper.path(p);
	anim_1.path.attr({stroke: "#0d4d08", "stroke-width": 1});
	
	//add object
	anim_1.offset_x = 40;
	anim_1.offset_y = 20;
	anim_1.object = anim_1.paper.image("ac_side.png",0,0,80,27);
	
	anim_1.loops = 1;
	anim_1.align_path = true;
	anim_1.rotation_offset = 180;

	anim_1.reset();
	
}






function ini_animation_2 ()
{

	//rotate late
	
	anim_2 = new path_animation("anim_2");	
	anim_2.paper = Raphael("animation_2", 800, 300);
	
	anim_2.duration = 4000;
	
	//define path
	var p = "M40,186";
	p += "L500,186";
	p += "Q700,200,750,130";
	
	anim_2.path = anim_2.paper.path(p);
	anim_2.path.attr({stroke: "#df0000", "stroke-width": 1});
	
	//add object
	anim_2.offset_x = 40;
	anim_2.offset_y = 20;
	anim_2.object = anim_2.paper.image("ac_side.png",0,0,80,27);
	
	anim_2.loops = 1;
	
	//define rotate_frames
	anim_2.rotate_frames = [];
	anim_2.rotate_frames.push([0,0]);
	anim_2.rotate_frames.push([0.7,0]);
	anim_2.rotate_frames.push([1,-40]);	
	
	anim_2.reset();
	
}





function ini_animation_3 ()
{

	//rotate early
	
	anim_3 = new path_animation("anim_3");	
	anim_3.paper = Raphael("animation_3", 800, 300);
	
	anim_3.duration = 4000;
	
	//define path
	var p = "M40,186";
	p += "L200,186";
	p += "Q700,186,750,140";
	
	anim_3.path = anim_3.paper.path(p);
	anim_3.path.attr({stroke: "#b68613", "stroke-width": 1});
	
	//add object
	anim_3.offset_x = 40;
	anim_3.offset_y = 20;
	anim_3.object = anim_3.paper.image("ac_side.png",0,0,80,27);
	
	anim_3.loops = 1;
	
	//define rotate_frames
	anim_3.rotate_frames = [];
	anim_3.rotate_frames.push([0,0]);
	anim_3.rotate_frames.push([0.3,0]);
	anim_3.rotate_frames.push([1,-40]);
	
	anim_3.reset();
	
}