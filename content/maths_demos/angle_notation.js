

var angles;
var button_count = 4;
var last_index = 0;
var correct_answer;
var answer_position;
var attempts;
var allowed_attempts = 2;
var active;
var time_delay = 2000;


function ini_scene ()
{

	angles = ['ADC', 'ADE', 'BCD', 'BEA', 'CED', 'DCE'];
	attempts = 0;
	active = true;
	
	$('#response').html('');
	
	for (var button_index = 1; button_index <= button_count; button_index++) {
		$('#button_' + button_index).removeClass('faded');
		$('#button_' + button_index).removeClass('correct');
		$('#button_' + button_index).removeClass('reveal_correct');
	}
	
}





function ask_question ()
{

	ini_scene();
	
	//pick correct answer
	correct_answer = angles[get_random_index()];
	
	//pick correct answer position
	answer_position = Math.ceil(Math.random() * button_count);
	
	//show angle on shape
	$('#angle').css({ background: 'url(angle_notation/' + correct_answer + '.png)' });
	
	//create buttons
	var t_angles = angles;
	var answer_index = t_angles.indexOf(correct_answer);
	t_angles.splice(answer_index, 1);	
	
	for (var i = 1; i <= button_count; i++) {
	
		if (i == answer_position) {
		
			//show correct button
			$('#button_' + i).css({ background: 'url(angle_notation/button_' + correct_answer + '.png)' });

			
		} else {
		
			//show random button
			var t_index = Math.round(Math.random() * (t_angles.length - 1));
			var this_angle = t_angles.splice(t_index, 1);
			$('#button_' + i).css({ background: 'url(angle_notation/button_' + this_angle + '.png)' });
			
		}
	
	}
	
}






function check_answer (button_index)
{

	if (!active) {
		return false;
	}
	
	attempts++;
	
	if (button_index == answer_position) {
		
		active = false;
		$('#button_' + button_index).addClass('correct');
		$('#response').html('Correct');
		setTimeout(ask_question, time_delay);
		
	} else {
	
		$('#button_' + button_index).addClass('faded');
		$('#response').html('Try again');
		
		if (attempts >= allowed_attempts) {
		
			active = false;
			$('#button_' + answer_position).addClass('reveal_correct');
			$('#response').html('The correct answer was ' + correct_answer);
			setTimeout(ask_question, time_delay * 2);
			
		}
		
	}
	
}






function get_random_index ()
{

	var i = Math.round((Math.random() * (angles.length - 1)));
	
	if (i == last_index) { i = get_random_index(); }
	
	last_index = i;
	
	return i;
	
}


