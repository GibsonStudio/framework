
var correct_answer = 0;
var answer_accuracy = 0.1;


function ini_question ()
{
  generate_question();
}





function reveal_answer ()
{

  var html = 'The correct answer is ' + correct_answer + '.';
  $('#output').html(html);

}




function submit_answer ()
{

  var their_answer = ($('#answer_input').val() * 1.0).toFixed(2);

  if (their_answer == correct_answer) {

    $('#output').html('Spot on!');

  } else if ( (Math.abs(their_answer - correct_answer)).toFixed(2) <= answer_accuracy) {

    $('#output').html('Correct. The exact answer is ' + correct_answer);

  }
  else {

    $('#output').html('Wrong. Check your orders of magnitude.');

  }

}




function submit_answer_vector ()
{

  var their_answer = $('#answer_input').val();

  //check answer in correct format
  if (!their_answer.includes('/')) {
    $('#output').html('Answers must be in the format xxx/xxx');
    return;
  }

  their_answer = their_answer.split('/');
  var correct_answer_temp = correct_answer.split('/');

  //get direction
  var direction = their_answer[0].trim();
  var correct_direction = correct_answer_temp[0].trim();

  //get speed
  var speed = their_answer[1].trim();
  var correct_speed = correct_answer_temp[1].trim();

  if (direction.length != 3) {
    $('#output').html('Remember, directions should be 3 digits (use leading zeros for numbers less than 100).');
    return;
  }

  var output = '<table><tr><td>Direction:</td><td>';

  //check direction
  if (direction == correct_direction) {
    output += 'Spot on!';
  } else if (Math.abs(direction - correct_direction) < 5) {
    output += 'Almost, the exact answer is ' + correct_direction;
  } else {
    output += 'Wrong; check your orders of magnitude.';
  }

  //check speed
  output += '</td></tr><tr><td>Speed:</td><td>';
  if (speed == correct_speed) {
    output += 'Spot on!';
  } else if (Math.abs(speed - correct_speed) <= 1) {
    output += 'Almost, the exact answer is ' + correct_speed;
  } else {
    output += 'Wrong; check your orders of magnitude.';
  }

  output += '</td></tr></table>';

  $('#output').html(output);

}



function fix_direction (direction)
{
  return resolve_direction(limit_direction(direction));
}


function limit_direction (direction)
{

  direction = direction % 360;
  if (direction <= 0) {
    direction += 360;
  }

  return direction;

}



function resolve_direction (direction)
{

  if (direction < 10) {
    return '00' + direction;
  } else if (direction < 100) {
    return '0' + direction;
  }

  return direction;

}



function resolve_runway (runway)
{

  if (runway < 10) {
    return '0' + runway;
  }

  return runway;

}



function my_atan (xx, yy)
{

  if (xx > 0){
		return to_degrees(Math.atan(yy / xx));
	} else if ((xx < 0) && (yy >= 0)){
		return to_degrees(Math.atan(yy / xx)) + 180; //radsToDegs(Math.PI);
	} else if ((xx == 0) && (yy > 0)){
		return 90; //radsToDegs(Math.PI)/2;
	} else if ((xx < 0) && (yy < 0)){
		return to_degrees(Math.atan(yy / xx)) - 180; //radsToDegs(Math.PI);
	} else if ((xx ==0) && (yy < 0)){
		return -90; //radsToDegs(Math.PI) / 2;
	} else {
		return 0; //"error";
	}

}
