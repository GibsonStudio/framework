
var start_delay = 3000;
var status = 'stopped';
var square_numbers = [4, 9, 16, 25, 36, 49, 64, 81, 100];
var this_number = 0;
var my_function;
var question_time = 3000;
var total_questions = 0;
var got_right = 0;

function start_quiz ()
{

	total_questions = 0;
	got_right = 0;
	set_bar_graph(0);
	
	if (status == 'stopped')
	{
	
		$('#my_output').html('Starting....');
		$('#start_button').addClass('button_faded');
		$('#stop_button').removeClass('button_faded');
		status = 'starting';

		my_function = setTimeout( ask_question, start_delay );
	
	}
	
}



function stop_quiz ()
{

	clearTimeout(my_function);
	$('#my_number').addClass('number_inactive').removeClass('number_active');
	$('#my_buttons').addClass('button_faded');
	$('#my_output').removeClass('output_correct').removeClass('output_wrong');
	$('#my_output').html('Stopped...');
	$('#start_button').removeClass('button_faded');
	$('#stop_button').addClass('button_faded');
	
	status = 'stopped';
	
}



function submit_button ( bool )
{
	
	if ( status == 'waiting_for_input' )
	{
	
		clearTimeout(my_function);
		status = 'processing_input';
		
		$('#my_number').addClass('number_inactive').removeClass('number_active');
		$('#my_buttons').addClass('button_faded');
	
		if ( bool == is_square(this_number) ) {
		
			//got right
			$('#my_output').html('Correct!');
			$('#my_output').addClass('output_correct');
			got_right++;
			
		} else {
		
			//got wrong
			$('#my_output').html('Wrong!');
			$('#my_output').addClass('output_wrong');
			
		}
		
		show_score();
		
		my_function = setTimeout(ask_question, start_delay);
		
	}
	
}




function ask_question ()
{

	total_questions++;
	status = 'waiting_for_input';
	$('#my_number').addClass('number_active').removeClass('number_inactive');
	$('#my_buttons').removeClass('button_faded');
	$('#my_output').html('Is this a square number?');
	$('#my_output').removeClass('output_correct').removeClass('output_wrong');
	
	var num = Math.floor(Math.random() * 2);
	
	if (num == 0)
	{
		var index = get_random_number(0, square_numbers.length - 1, 1);
		this_number = square_numbers[index];
		$('#my_number').html(this_number);
	}
	else
	{
		this_number = get_random_number(2, 100, 1);
		$('#my_number').html(this_number);
	}	
	
	my_function = setTimeout(took_too_long, question_time);
	
}



function took_too_long ()
{
	
	$('#my_number').addClass('number_inactive').removeClass('number_active');
	$('#my_buttons').addClass('button_faded');	
	$('#my_output').addClass('output_wrong');
	
	var message = 'You took too long!<br />';
	message += this_number + ' was ';
	
	message += is_square(this_number) ? '' : 'NOT';
	
	message += ' a square number';
	
	$('#my_output').html(message);
	
	status = 'took_too_long';
	show_score();
	
	my_function = setTimeout(ask_question, start_delay);
	
}



function show_score ()
{

	if (total_questions > 0) {
	
		var percent = (got_right / total_questions) * 100;
		set_bar_graph(percent);
		
	}

}






function is_square (num)
{

	if (Math.sqrt(num) % 1 === 0) {
		return true;
	}

	return false;	
	
}









