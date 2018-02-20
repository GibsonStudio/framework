
var current_question = 0;

function generate_question ()
{

  $('#output').html('');
  $('#answer_input').val('');

  $('#question_type').html('Iterative Ram Rise');
  answer_accuracy = 2;

  var ans = [];
  ans.push([280, 350, -25, 475]);
	ans.push([265, 390, -35, 478]);
	ans.push([250, 330, -17, 425]);
	ans.push([230, 310, -20, 378]);
	ans.push([235, 290, -22, 372]);
	ans.push([240, 370, -20, 443]);
	ans.push([260, 410, -30, 495]);
	ans.push([245, 350, -33, 418]);
	ans.push([220, 370, -35, 398]);
	ans.push([230, 330, -35, 383]);

  var cas = ans[current_question][0];
  var fl = ans[current_question][1];
  var tat = ans[current_question][2];
  correct_answer = ans[current_question][3];

  current_question++;
  if (current_question >= ans.length) { current_question = 0; }

  var html = 'Given the following values of CAS, Flight Level and TAT, what is the TAS?<br /><br />';

  html += '<table>';
  html += '<tr><td>CAS</td><td style="width: 50px; text-align: center;">=</td><td>' + cas + ' kt</td></tr>';
  html += '<tr><td>Flight Level</td><td style="width: 50px; text-align: center;">=</td><td>' + fl + '</td></tr>';
  html += '<tr><td>TAT</td><td style="width: 50px; text-align: center;">=</td><td>' + tat + '&deg;C</td></tr>';
  html += '</table>';

  html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' kt)';
  $('#question_text').html(html);

}
