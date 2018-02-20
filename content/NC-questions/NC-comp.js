
var current_question = 0;

function generate_question ()
{

  $('#output').html('');
  $('#answer_input').val('');

  $('#question_type').html('Compressibility');
  answer_accuracy = 5;

  var ans = [];
  ans.push([280, 350, -40, 487]);
	ans.push([265, 390, -52, 492]);
	ans.push([250, 330, -37, 425]);
	ans.push([230, 310, -39, 376]);
	ans.push([235, 290, -37, 371]);
	ans.push([240, 370, -45, 437]);
	ans.push([260, 410, -55, 502]);
	ans.push([245, 350, -57, 418]);
	ans.push([220, 370, -60, 392]);
	ans.push([230, 330, -52, 384]);

  var cas = ans[current_question][0];
  var fl = ans[current_question][1];
  var sat = ans[current_question][2];
  correct_answer = ans[current_question][3];

  current_question++;
  if (current_question >= ans.length) { current_question = 0; }

  var html = 'Given the following values of CAS, Flight Level and SAT, what is the TAS?<br /><br />';

  html += '<table>';
  html += '<tr><td>CAS</td><td style="width: 50px; text-align: center;">=</td><td>' + cas + ' kt</td></tr>';
  html += '<tr><td>Flight Level</td><td style="width: 50px; text-align: center;">=</td><td>' + fl + '</td></tr>';
  html += '<tr><td>SAT</td><td style="width: 50px; text-align: center;">=</td><td>' + sat + '&deg;C</td></tr>';
  html += '</table>';

  html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' kt)';
  $('#question_text').html(html);

}
