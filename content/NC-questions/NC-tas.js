


function generate_question ()
{

  $('#output').html('');
  $('#answer_input').val('');

  $('#question_type').html('TAS from Mach Number');
  answer_accuracy = 10;

  var mach = get_random_number(0.5, 1.4, 0.01);
  var oat = get_random_number(-60, 30, 1);

  var html = 'What is your TAS if your Mach Number is ' + mach + ' and the OAT is ' + oat + '&deg;C?';

  html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' kt)';
  $('#question_text').html(html);

  correct_answer = mach * (38.95 * Math.sqrt(273 + oat));
  correct_answer = round_number(correct_answer, 1);

}
