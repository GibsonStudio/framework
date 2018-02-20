
var my_anim;


function ini_animation ()
{

	my_anim = new path_animation("my_anim");	
	my_anim.paper = Raphael("my_paper", 500, 500);
	
	//draw path
	var p = "M50,50";
	p += "L450,50";
	p += "L450,450";
	p += "L50,450";
	p += "Z";
		
	my_anim.path = my_anim.paper.path(p);	
	my_anim.path.attr({ stroke: "#3e4899", "stroke-width": 1 });	
	
	//add object
	my_anim.object = my_anim.paper.image("ac.png", 0, 0, 40, 50);
	
	my_anim.offset_x = 20;
	my_anim.offset_y = 25;
	
	my_anim.duration = 4000;
	my_anim.loops = 0;
	
	my_anim.align_path = true;
	my_anim.rotation_offset = -90;
	
	my_anim.reset();
	my_anim.start();

}







