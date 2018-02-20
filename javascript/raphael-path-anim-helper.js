
//Raphael Path Animation Helper
//by Jon Williams
//v1.0
//October 2015


function path_animation (instance_name)
{

	//user defined variable	
	this.instance_name = instance_name ? instance_name : "";
	
	if (this.instance_name == "") {
		var err = "path_animation ERROR!\n\n";
		err += "You must initiate the object with an instance name ";
		err += "equal to the variable name. i.e.\n\n"
		err += "an1 = new path_animation(\"an1\");";
		alert(err);
	}
	
	this.paper;
	this.path;
	this.object;
	this.frame_rate = 60;
	this.loops = 0;
	this.duration = 1000;
	this.start_time = 0;
	this.elapsed_time = 0;
	this.loop_count = 0;
	this.rotate_frames = [[0,0],[1,0]];
	this.animation;
	this.offset_x = 10;
	this.offset_y = 10;
	this.align_path = false;
	this.rotation_offset = 0;
	this.reverse = false;
	this.reverse_rotation = true;

	
	
	
	this.start = function ()
	{
		var my_date = new Date();
		this.start_time = my_date.getTime();
		clearInterval(this.animation);
		
		//reverse?
		var pos = this.path.getPointAtLength(0);
		
		if (this.reverse) {
			pos = this.path.getPointAtLength(this.path.getTotalLength());
		}		
		
		this.object.attr({x: pos.x - this.offset_x, y: pos.y - this.offset_y});
		this.animation = window.setInterval(this.instance_name + ".animate_object()",  (1000 / this.frame_rate) );
		
	}
	
	
	
	
	this.stop = function ()
	{
		clearInterval(this.animation);
		this.animation = null;
	}
	
	
	
	
	this.resume = function ()
	{
		if (!this.animation)
		{
			var my_date = new Date();
			this.start_time = my_date.getTime() - this.elapsed_time;
			this.animation = window.setInterval(this.instance_name + ".animate_object()",  (1000 / this.frame_rate) );
		}
	}
	
	
	
	
	this.pause = function ()
	{
		
		if (this.animation)
		{
			this.stop();
		}
		else
		{
			this.resume();
		}
		
	}
	
	
	
	
	this.go_to_point = function (my_ratio)
	{		
	
		if (this.reverse) { my_ratio = 1 - my_ratio; }
		
		var anim_length = this.path.getTotalLength() * my_ratio;
		var pos = this.path.getPointAtLength(anim_length);
		this.object.attr({x: pos.x - this.offset_x, y:pos.y - this.offset_y});
		this.object.transform("t0");		
	}
	
	
	
	
	this.reset = function ()
	{
		clearInterval(this.animation);
		this.animation = null;
	
		var pos = this.path.getPointAtLength(0);	
		
		//reverse?
		if (this.reverse) {
			pos = this.path.getPointAtLength(this.path.getTotalLength());
		}
		
		this.object.attr({x: pos.x - this.offset_x, y:pos.y - this.offset_y});

		//align to path?
		if (this.align_path) {
			
			var my_ratio = this.reverse ? 1 : 0;
			var angle = this.get_path_angle(my_ratio) + this.rotation_offset; //this.anim_ratio) + this.rotation_offset;
			this.object.transform("r" + angle);
			
		} else {
		
			var frames_index = this.reverse ? this.rotate_frames.length - 1 : 0;
			this.object.transform("r" + this.rotate_frames[frames_index][1]);
			
		}
		
	}
	
	
	
	
	
	this.animate_object = function ()
	{

		var my_date = new Date();
		this.elapsed_time = my_date.getTime() - this.start_time;	
		
		//get animation position as a ratio
		var my_ratio = this.elapsed_time / this.duration;	
		
		//reverse?
		if (this.reverse) { my_ratio = 1 - my_ratio; }
		
		//calculate new my_object position
		
		if ( (my_ratio >= 1 && !this.reverse) ||  (my_ratio <= 0 && this.reverse) )
		{
			
			this.loop_count++;
			
			if (this.loops == 0)
			{
			
				my_ratio = this.reverse ? 1 : 0;
				this.start_time = my_date.getTime();
				
			}
			else if (this.loop_count < this.loops)
			{
			
				my_ratio = this.reverse ? 1 : 0;
				this.start_time = my_date.getTime();
				
			}
			else
			{
			
				clearInterval(this.animation);
				
				//rotate element?
				if (this.rotate_frames.length >= 2)
				{
					var my_r = this.rotate_frames[this.rotate_frames.length][1];
					this.object.transform("r" + my_r);
				}
				
				
			}
			
			
		}
		else
		{
					
			var anim_length = this.path.getTotalLength() * my_ratio; //this.anim_ratio;
			var pos = this.path.getPointAtLength(anim_length);
			this.object.attr({x: pos.x - this.offset_x, y:pos.y - this.offset_y});
			this.object.transform("t0");
			
			//rotate element?
			if (this.align_path)
			{
			
				var angle = this.get_path_angle(my_ratio) + this.rotation_offset; //this.anim_ratio) + this.rotation_offset;
				this.object.transform("r" + angle);
			}
			else if (this.rotate_frames.length >= 2)
			{
				var my_r = this.get_rotation_from_ratio(my_ratio); //this.anim_ratio);
				this.object.transform("r" + my_r);
			}
	
		}
		
	}
	
	
	
	
	
	this.reverse_animation = function ()
	{
	
		this.reverse = !this.reverse;

		this.elapsed_time = this.duration - this.elapsed_time;
		
		var my_date = new Date();
		this.start_time = my_date.getTime() - this.elapsed_time;		
		
		//reverse angle
		if (this.align_path && this.reverse_rotation) {
			
			var new_angle = (this.rotation_offset + 180) % 360;
			this.rotation_offset = new_angle;
			
		}
		
	}
	
	
	
	
	
	this.get_ratio = function ()
	{
		return this.elapsed_time / this.duration;
	}
	
	
	
	
	this.get_path_angle = function (ratio)
	{
	
		ratio_1 = 0.18;
		
		var ratio_offset = 0.01;
		var ratio_1 = ratio - ratio_offset;
		var ratio_2 = ratio + ratio_offset;
		
		//keep ratios within limits
		if (ratio_1 < 0) { ratio_1 = 0; }
		if (ratio_2 > 1) { ratio_2 = 1; }
		
		var path_length = this.path.getTotalLength();
		var p1 = this.path.getPointAtLength(path_length * ratio_1);
		var p2 = this.path.getPointAtLength(path_length * ratio_2);
		
		var angle = Raphael.angle(p1.x, p1.y, p2.x, p2.y);
		
		return angle;
				
	}
	
	
	
	
	
	this.get_rotation_from_ratio = function (my_ratio)
	{
		
		var my_rotation = 0;
		
		//find which 2 rotate_frames we are between
		var frame1 = this.rotate_frames[0];
		var frame2 = this.rotate_frames[1];
		
		if (my_ratio >= 1)
		{
		
			frame1 = this.rotate_frames[this.rotate_frames.length - 2];
			frame2 = this.rotate_frames[this.rotate_frames.length - 1];
			
		}
		else
		{
		
			for (var i = 0; i < this.rotate_frames.length; i++)
			{
			
				if (my_ratio >= this.rotate_frames[i][0] && my_ratio < this.rotate_frames[i + 1][0])
				{
					frame1 = this.rotate_frames[i];
					frame2 = this.rotate_frames[i + 1];
					break;
				}
				
			}
		
		}	
		
		//work out the position we are between these 2 rotate_frames
		// and work out the required rotation value

		ratio1 = frame1[0];
		angle1 = frame1[1];
		ratio2 = frame2[0];
		angle2 = frame2[1];
		
		ratio_range = ratio2 - ratio1;
		angle_range = angle2 - angle1;
		this_ratio = (my_ratio - ratio1) / ratio_range;
		
		my_rotation = angle1 + (this_ratio * angle_range);
		
		return my_rotation
		
	}
	


	
}