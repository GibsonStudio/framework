


function generate_question ()
{

  $('#output').html('');
  $('#answer_input').val('');

  var ran = Math.floor(Math.random() * 2);

  if (ran == 0) {

    $('#question_type').html('Multiplication');
    answer_accuracy = 0.2;

    var number_one = get_random_number(0.5, 10, 0.1);
    var number_two = get_random_number(0.5, 10, 0.1);

    var html = 'What is ' + number_one + ' &#215; ' + number_two + '?';
    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ')';
    $('#question_text').html(html);

    correct_answer = number_one * number_two;
    correct_answer = round_number(correct_answer, answer_accuracy);

  } else {

    $('#question_type').html('Division');
    answer_accuracy = 0.01;

    var number_one = get_random_number(0.5, 10, 0.1);
    var number_two = get_random_number(0.5, 10, 0.1);

    var html = 'What is ' + number_one + ' &#247; ' + number_two + '?';
    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ')';
    $('#question_text').html(html);

    correct_answer = number_one / number_two;
    correct_answer = round_number(correct_answer, answer_accuracy);

  }

}
