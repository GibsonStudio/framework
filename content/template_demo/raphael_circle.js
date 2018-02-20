
var my_anim;


function ini_animation ()
{

	my_anim = new path_animation("my_anim");	
	my_anim.paper = Raphael("my_paper", 500, 500);
	
	//draw path
	var p = "M50,250";
	p += "Q60,60,250,50";
	p += "Q440,60,450,250";
	p += "Q440,440,250,450";
	p += "Q60,440,50,250";	
	
	my_anim.path = my_anim.paper.path(p);
	my_anim.path.attr({ stroke: "#3e4899", "stroke-width": 1 });	
	
	//add object
	my_anim.object = my_anim.paper.image("ac.png", 0, 0, 40, 50);
	
	my_anim.offset_x = 20;
	my_anim.offset_y = 25;	
	my_anim.duration = 4000;	
	my_anim.align_path = true;
	my_anim.rotation_offset = -90;
	
	my_anim.reset();
	my_anim.start();

}







