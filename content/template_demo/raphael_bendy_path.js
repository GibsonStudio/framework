

var my_anim;


function ini_animation ()
{

	my_anim = new path_animation("my_anim");	
	my_anim.paper = Raphael("my_paper", 1000, 500);
	
	//draw path to animate	
	var p = "M 85,301 C 54.892,193.569 182.38755,14.247525 312.38755,42.247525 534.78855,90.149525 565,577 740,412 1137.723,37.004 728,-100 289,296 c 0,0 -160,162 -204,5 z";
	
	my_anim.path = my_anim.paper.path(p);
	//my_anim.path.attr({ stroke: 'none' }); //path is invisible
	my_anim.path.attr({ stroke: "#3e4899", "stroke-width": 1 });	

	//add object
	my_anim.object = my_anim.paper.image("ac.png", 0, 0, 40, 50);
	
	my_anim.offset_x = 20;
	my_anim.offset_y = 25;
	
	my_anim.duration = 10000;
	
	my_anim.align_path = true;
	my_anim.rotation_offset = -90;
	//my_anim.reverse_rotation = false;
		
	my_anim.reset();
	my_anim.start();
	
}


