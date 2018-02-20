


function generate_question ()
{

  $('#output').html('');
  $('#answer_input').val('');

  $('#question_type').html('Calculate TAS');
  answer_accuracy = 5;

  var cas = get_random_number(100, 200, 10);
  var temp = get_random_number(-40, 0, 1);
  var pressure_alt = get_random_number(1000, 15000, 1000);

  var html = 'CAS is ' + cas + ', Pressure Altitude is ' + pressure_alt + ' ft, and the temperature is ' + temp + '&deg;C. What is your TAS?';

  html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' kt)';
  $('#question_text').html(html);

  correct_answer = cas / (Math.sqrt((Math.pow((1 - pressure_alt * 0.000006877), 5.255) * 288) / (273 + temp)));
  correct_answer = round_number(correct_answer, 1);


}
