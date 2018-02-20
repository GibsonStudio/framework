
var my_anim;



function ini_animation ()
{

	my_anim = new path_animation("my_anim");
	
	my_anim.paper = Raphael("scope", 800, 400);
	
	//draw path
	var p = "M0,200";
	p += "Q100,-100,200,200";
	p += "Q300,500,400,200";
	p += "Q500,-100,600,200";
	p += "Q700,500,800,200";
	
	my_anim.path = my_anim.paper.path(p);
	my_anim.path.attr({stroke: "#00df00", "stroke-width": 1, opacity: 0.2});
	
	//add axis
	var axis = "M0,200";
	axis += "L800,200";
	axis += "M400,0";
	axis += "L400,400";
	
	var ax = my_anim.paper.path(axis);
	ax.attr({stroke: "#00df00", "stroke-width": 2, opacity: 0.6});	
	
	//add object
	my_anim.object = my_anim.paper.image("dot.png", 0, 0, 18, 18);

	//set some params
	my_anim.offset_x = 9;
	my_anim.offset_y = 9;
	my_anim.loops = 0;
	my_anim.duration = 2000;
	
	my_anim.reset();
	my_anim.start();
	
}









