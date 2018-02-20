


function generate_question ()
{

  $('#output').html('');
  $('#answer_input').val('');

  var ran = Math.floor(Math.random() * 2);

  if (ran == 0) {

    $('#question_type').html('Calculate Headwind');
    answer_accuracy = 1;

    var runway = get_random_number(1, 36, 1);
    var runway_angle = runway * 10;
    var wind_speed = get_random_number(5, 35, 5);
    var wind_offset = get_random_number(10, 80, 10);
    var plus_or_minus = Math.floor(Math.random() * 2);
    var wind_dir = 0;

    if (plus_or_minus == 0) {
      wind_dir = runway_angle + wind_offset;
    } else {
      wind_dir = runway_angle - wind_offset;
    }

    wind_dir = limit_direction(wind_dir);

    var theta = Math.abs(wind_dir - runway_angle);
    correct_answer = Math.cos(to_radians(theta)) * wind_speed;
    correct_answer = round_number(correct_answer, answer_accuracy);

    var html = 'You have been allocated runway ' + resolve_runway(runway) + '. Surface wind is ' + fix_direction(wind_dir) + '/' + wind_speed + '. What is the headwind in knots?';

    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' kt)';

    html += '<br /><br />Wind direction is assumed to be in degrees magnetic.';

    $('#question_text').html(html);

  } else {

    $('#question_type').html('Calculate Crosswind');
    answer_accuracy = 1;

    var runway = get_random_number(1, 36, 1);
    var runway_angle = runway * 10;
    var wind_speed = get_random_number(5, 35, 5);
    var wind_offset = get_random_number(10, 80, 10);
    var plus_or_minus = Math.floor(Math.random() * 2);
    var wind_dir = 0;

    if (plus_or_minus == 0) {
      wind_dir = runway_angle + wind_offset;
    } else {
      wind_dir = runway_angle - wind_offset;
    }

    wind_dir = limit_direction(wind_dir);

    var theta = Math.abs(wind_dir - runway_angle);
    correct_answer = Math.sin(to_radians(theta)) * wind_speed;
    correct_answer = round_number(correct_answer, answer_accuracy);

    var html = 'You have been allocated runway ' + resolve_runway(runway) + '. Surface wind is ' + fix_direction(wind_dir) + '/' + wind_speed + '. What is the crosswind in knots?';

    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' kt)';

    html += '<br /><br />Wind direction is assumed to be in degrees magnetic.';

    $('#question_text').html(html);

  }


}
