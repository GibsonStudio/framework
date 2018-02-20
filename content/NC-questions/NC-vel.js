


function generate_question ()
{

  $('#output').html('');
  $('#answer_input').val('');
  $('#question_type').html('Calculate Wind Velocity');

  var track = get_random_number(10, 350, 5);
  var tas = get_random_number(80, 150, 1);
  var heading = track - 25 + get_random_number(1, 50, 1);

  if (heading == track) {
    heading = track + 5;
  }

  heading = limit_direction(heading);

  var groundspeed = tas - 20 + get_random_number(1, 40, 1);
  var xx = tas * Math.cos(to_radians(heading - track)) - groundspeed;
  var yy = tas * Math.sin(to_radians(heading - track));

  var wind_dir = track + my_atan(xx, yy);
  wind_dir = round_number(wind_dir, 1);
  wind_dir = fix_direction(wind_dir);  
  var wind_speed = Math.sqrt(Math.pow((tas - groundspeed), 2) + (4 * tas * groundspeed * Math.pow(Math.sin((to_radians(heading - track)) / 2.0), 2)));

  correct_answer = wind_dir + '/' + round_number(wind_speed, 1);

  var html = '';
  /*
  html += 'track: ' + track + '<br />';
  html += 'tas: ' + tas + '<br />';
  html += 'heading: ' + heading + '<br />';
  html += 'groundspeed: ' + groundspeed + '<br />';
  html += 'xx: ' + xx + '<br />';
  html += 'yy: ' + yy + '<br />';
  html += 'dir: ' + wind_dir + '<br />';
  html += 'speed: ' + wind_speed + '<br /><br />';
  */
  html += 'The aircraft heading is ' + heading + ' to maintain a required track of ' + track + '. If the TAS is ' + tas + ' kt';
  html += ' and the ground speed is ' + groundspeed + ' kt, what is the wind velocity?';

  html += '<br /><br />(Give direction in the range 001-360 and to the nearest degree. Give wind speed to the nearest knot. ';
  html += 'Answer in the format direction/speed. All directions are assumed to be in degrees true.)';
  $('#question_text').html(html);

}
