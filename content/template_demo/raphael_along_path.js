

function ini_animation ()
{
	
	my_anim = new path_animation("my_anim");	
	my_anim.paper = Raphael("my_paper", 500, 500);
	
	//draw path to animate
	var p = "M50,50";
	p += "L250,450";
	p += "L450,50";
	p += "L250,450";
	p += "Z";
	
	my_anim.path = my_anim.paper.path(p);
	my_anim.path.attr({stroke: "none"});
	
	//draw the path that is seen
	var seen_path = my_anim.paper.path("M50,50L250,450L450,50");
	seen_path.attr({ stroke: "#3e4899", "stroke-width": 1 });	
	
	//why do we draw 2 paths?
	//because the animate path overlaps itself, if we were to
	//add a stroke to it, the stroke would effectively be drawn 
	//twice; this can look poo.
	
	//add object
	my_anim.object = my_anim.paper.image("ac.png", 0, 0, 40, 50);
	
	my_anim.offset_x = 20;
	my_anim.offset_y = 25;
	
	my_anim.duration = 4000;
	my_anim.loops = 0;
	
	//set rotate_frames
	my_anim.rotate_frames = [];
	my_anim.rotate_frames.push([0,150]);

	my_anim.rotate_frames.push([0.25,150]);
	my_anim.rotate_frames.push([0.25,30]);
	
	my_anim.rotate_frames.push([0.5,30]);
	my_anim.rotate_frames.push([0.5,210]);
	
	my_anim.rotate_frames.push([0.75,210]);
	my_anim.rotate_frames.push([0.75,-30]);
	
	my_anim.rotate_frames.push([1,-30]);
	
	my_anim.reset();
	my_anim.start();

}

