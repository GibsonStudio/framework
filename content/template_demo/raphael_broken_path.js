
var my_anim;


function ini_animation ()
{

	my_anim = new path_animation("my_anim");	
	my_anim.paper = Raphael("my_paper", 500, 500);
	
	//draw path
	var p = "M50,50";
	p += "L450,50";
	p += "M50,150L450,150";
	p += "M50,250L450,250";
	p += "M50,350L450,350";
	p += "M50,450L450,450";	
	
	my_anim.path = my_anim.paper.path(p);
	my_anim.path.attr({ stroke: "#3e4899", "stroke-width": 1 });	
	
	//add object
	my_anim.object = my_anim.paper.image("ac.png", 0, 0, 40, 50);
	
	my_anim.offset_x = 20;
	my_anim.offset_y = 25;
	
	my_anim.duration = 2000;
	my_anim.loops = 0;
	//my_anim.reverse = true;
	my_anim.rotate_frames = [[0,90],[1,90]];
	
	my_anim.reset();
	my_anim.start();

}







