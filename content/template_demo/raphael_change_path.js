

var my_anim;
var path1;
var path2;

function ini_animation ()
{

	my_anim = new path_animation("my_anim");	
	my_anim.paper = Raphael("my_paper", 500, 500);
	
	//create 2 paths
	path1 = my_anim.paper.path("M50,50L450,50");
	path1.attr({ stroke: "#e40f18", "stroke-width": 1 });
	path2 = my_anim.paper.path("M50,300L450,300");
	path2.attr({ stroke: "#3e4899", "stroke-width": 1 });
	
	my_anim.path = path1; 
	
	//add object
	my_anim.object = my_anim.paper.image("ac.png", 0, 0, 40, 50);
	
	my_anim.offset_x = 20;
	my_anim.offset_y = 25;
	
	my_anim.duration = 4000;
	my_anim.loops = 0;
	
	my_anim.rotate_frames = [[0,90],[1,90]];
	
	my_anim.reset();
	my_anim.start();

}






function change_path ()
{
	
	if (my_anim.path == path1)
	{
		my_anim.path = path2;
	}
	else
	{
		my_anim.path = path1;
	}
	
}









