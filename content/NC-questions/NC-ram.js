


function generate_question ()
{

  $('#output').html('');
  $('#answer_input').val('');

  $('#question_type').html('Ram Rise');
  answer_accuracy = 1;

  var tas = get_random_number(100, 700, 1);

  var html = 'What is the Ram Rise if the TAS is ' + tas + ' kt?';

  html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + '&deg;C)';
  $('#question_text').html(html);

  correct_answer = Math.pow((tas / 100.0), 2.043);
  correct_answer = round_number(correct_answer, 0.1);

}
