


function generate_question ()
{

  $('#output').html('');
  $('#answer_input').val('');

  $('#question_type').html('Density Altitude');
  answer_accuracy = 100;

  var temp = get_random_number(-25, 25, 1);
  var pressure_alt = get_random_number(0, 20000, 500);
  var isa = 15 + ((pressure_alt / 1000.0) * -1.98);
  var temp_diff = temp - isa;
  var alt_diff = temp_diff * 118.0;

  var html = 'Given a Pressure Altitude of ' + pressure_alt + ' ft, and a Corrected Air Temperature of ' + temp + '&deg;C, what is the Density Altitude?';

  html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' ft)';
  $('#question_text').html(html);

  correct_answer = pressure_alt + alt_diff;
  correct_answer = round_number(correct_answer, 1); //round to nearest ft


}
