


function generate_question ()
{

  $('#output').html('');
  $('#answer_input').val('');
  $('#question_type').html('Calculate Track and Groundspeed');

  var wind_dir = get_random_number(10, 350, 10);
  var wind_speed = get_random_number(5, 30, 1);
  var heading = get_random_number(10, 350, 5);
  var tas = get_random_number(80, 180, 1);

  var wca = Math.atan((wind_speed * Math.sin(to_radians(heading - wind_dir)))/(tas - (wind_speed * Math.cos(to_radians(heading - wind_dir)))));
  wca = to_degrees(wca);
  var groundspeed = Math.sqrt(Math.pow(wind_speed, 2) + Math.pow(tas, 2) - 2 * wind_speed * tas * Math.cos(to_radians(heading - wind_dir)));
  var track = heading + wca;

  track = round_number(track, 1);
  track = fix_direction(track);
  groundspeed = round_number(groundspeed, 1);

  correct_answer = track + '/' + groundspeed;

  var html = 'Your heading is ' + resolve_direction(heading) + ', your TAS is ' + tas + ' kt, and the wind velocity is ' + resolve_direction(wind_dir);
  html += '/' + wind_speed + '. What is your track and groundspeed?';

  html += '<br /><br />(Give heading in the range 001-360 and to the nearest degree. Give groundspeed to the nearest knot. ';
  html += 'Answer in the format track/gs. All directions are assumed to be in degrees true.)';
  $('#question_text').html(html);

}
