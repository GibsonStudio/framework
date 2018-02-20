
var power_on = false;
var ang_inc = 0.05;
var arrows = [];

//1st row
arrows.push({'id':0, 'x':50, 'y':130, 'default_ang':60, ang:0});
arrows.push({'id':1, 'x':120, 'y':130, 'default_ang':180, ang:0});
arrows.push({'id':2, 'x':190, 'y':130, 'default_ang':-130, ang:0});
arrows.push({'id':3, 'x':260, 'y':130, 'default_ang':45, ang:0});
arrows.push({'id':4, 'x':330, 'y':130, 'default_ang':104, ang:0});

//2nd row
arrows.push({'id':5, 'x':90, 'y':150, 'default_ang':130, ang:0});
arrows.push({'id':6, 'x':160, 'y':150, 'default_ang':-100, ang:0});
arrows.push({'id':7, 'x':230, 'y':150, 'default_ang':-160, ang:0});
arrows.push({'id':8, 'x':300, 'y':150, 'default_ang':-105, ang:0});
arrows.push({'id':9, 'x':370, 'y':150, 'default_ang':60, ang:0});

//3rd row
arrows.push({'id':10, 'x':50, 'y':170, 'default_ang':80, ang:0});
arrows.push({'id':11, 'x':120, 'y':170, 'default_ang':-120, ang:0});
arrows.push({'id':12, 'x':190, 'y':170, 'default_ang':-60, ang:0});
arrows.push({'id':13, 'x':260, 'y':170, 'default_ang':145, ang:0});
arrows.push({'id':14, 'x':330, 'y':170, 'default_ang':54, ang:0});

//4th row
arrows.push({'id':15, 'x':90, 'y':190, 'default_ang':13, ang:0});
arrows.push({'id':16, 'x':160, 'y':190, 'default_ang':100, ang:0});
arrows.push({'id':17, 'x':230, 'y':190, 'default_ang':116, ang:0});
arrows.push({'id':18, 'x':300, 'y':190, 'default_ang':-40, ang:0});
arrows.push({'id':19, 'x':370, 'y':190, 'default_ang':160, ang:0});

function add_arrows ()
{

	//adds arrow objects to the page and normalizes their angles
	
	var html = '';
	
	for (var i = 0; i < arrows.length; i++) {
		html += get_arrow_html(arrows[i]);
	}
	
	document.write(html);
	
	//normailze angles and rotate divs
	for (var i = 0; i < arrows.length; i++) {
	
		var arrow = arrows[i];
		arrow.default_ang = normalize_ang(arrow.default_ang);
		arrow.ang = arrow.default_ang;
		arrows[i] = arrow;
		$('#arrow_' + arrow.id).rotate(arrow.default_ang);
		
	}	
	
}




function get_arrow_html (args)
{

	//gets the html code for 1 arrow object
	
	var args = args || {};
	var id = args.id || 0;
	var x = args.x || 0;
	var y = args.y || 0;
	
	var html = '<div id="arrow_' + id + '" class="arrow" style="left:' + x + 'px; top:' + y + 'px;"></div>';
	return html;
	
}




function button_click ()
{

	if (!power_on) {
	
		//turn on
		power_on = true;
		$('#power_status').html('ON');
		$('#power_status').addClass('power_on');
		
	} else {
	
		//turn off
		power_on = false;
		$('#power_status').html('OFF');
		$('#power_status').removeClass('power_on');
		
	}
	
}






function run_animation ()
{


	for (var i = 0; i < arrows.length; i++) {
	
		//get this arrow object
		var arrow = arrows[i];
		
		//work out what target angle should be
		var target_angle = arrow.default_ang;
		
		if (power_on == true) {
			target_angle = 0;
		}
		
		//rotate arrow
		var ang_diff = target_angle - arrow.ang ;
		var new_ang = arrow.ang + (ang_diff * ang_inc);
		arrow.ang = new_ang;				
		
		$('#arrow_' + arrow.id).rotate(arrow.ang);
		
		//normalize values and store back in array
		arrow.ang = normalize_ang(arrow.ang);		
		arrows[i] = arrow;
		
	}


	//call next frame
	window.requestAnimationFrame(run_animation);
	
}





function normalize_ang (angle)
{
	
	//keeps angles in the range -180 < angle <= 180
	
	while (angle > 180) {
		angle -= 360;
	}
	
	while (angle <= -180) {
		angle += 360;
	}
	
	return angle;
	
}










