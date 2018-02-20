
var current_question = 0;

function generate_question ()
{

  $('#output').html('');
  $('#answer_input').val('');
  $('#question_type').html('Multi-drift Winds');
  answer_accuracy = 5;

  var ans = [];
  ans.push(['180', '130', '6&deg;P', '070', '4&deg;P', '190', '2&deg;P', '205/18']);
	ans.push(['150', '045', '3&deg;S', '345', '6&deg;P', '105', '8&deg;S', '026/22']);
	ans.push(['120', '270', '2&deg;S', '210', '12&deg;S', '330', '9&#189;&deg;P', '098/30']);
	ans.push(['165', '100', '2&deg;P', '040', '14&deg;P', '160', '12&deg;S', '107/40']);

  var tas = ans[current_question][0];
  var heading_1st = ans[current_question][1];
  var drift_1st = ans[current_question][2];
  var heading_2nd = ans[current_question][3];
  var drift_2nd = ans[current_question][4];
  var heading_3rd = ans[current_question][5];
  var drift_3rd = ans[current_question][6];

  correct_answer = ans[current_question][7];

  current_question++;
  if (current_question >= ans.length) { current_question = 0; }

  var html = 'Given:<br /><br />';
  html += '<table style="font-size:16px;">';
  html += '<tr><td>TAS</td><td style="width: 30px; text-align: center;">=</td><td>' + tas + ' kt</td></tr>';
  html += '<tr><td>1<sup>st</sup> Heading</td><td style="text-align: center;">=</td><td>' + heading_1st + ', drift ' + drift_1st + '</td></tr>';
  html += '<tr><td>2<sup>nd</sup> Heading</td><td style="text-align: center;">=</td><td>' + heading_2nd + ', drift ' + drift_2nd + '</td></tr>';
  html += '<tr><td>3<sup>rd</sup> Heading</td><td style="text-align: center;">=</td><td>' + heading_3rd + ', drift ' + drift_3rd + '</td></tr>';
  html += '</table>';
  html += '<br />What is the W/V?';

  html += '<br /><br />(Give direction in the range 001-360 and to the nearest degree. Give the speed to the nearest knot. ';
  html += 'Answer in the format direction/speed.)';
  $('#question_text').html(html);

}
