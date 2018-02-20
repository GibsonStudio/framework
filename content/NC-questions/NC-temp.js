


function generate_question ()
{

  $('#output').html('');
  $('#answer_input').val('');

  var ran = Math.floor(Math.random() * 2);

  if (ran == 0) {

    $('#question_type').html('Fahrenheit to Celsius');
    answer_accuracy = 1;

    var temp = get_random_number(-55, 120, 1);

    var html = 'Convert ' + temp + '&deg;F to Celsius';

    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + '&deg;C)';
    $('#question_text').html(html);

    correct_answer = (temp - 32) / 1.8;
    correct_answer = round_number(correct_answer, answer_accuracy);


  } else {

    $('#question_type').html('Celsius to Fahrenheit');
    answer_accuracy = 1;

    var temp = get_random_number(-50, 50, 1);

    var html = 'Convert ' + temp + '&deg;C to Fahrenheit';

    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + '&deg;F)';
    $('#question_text').html(html);

    correct_answer = (temp * 1.8) + 32;
    correct_answer = round_number(correct_answer, answer_accuracy);

  }

}
