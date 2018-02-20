


function generate_question ()
{

  $('#output').html('');
  $('#answer_input').val('');
  $('#question_type').html('Calculate Heading and Groundspeed');

  var wind_dir = get_random_number(10, 350, 10);
  var wind_speed = get_random_number(5, 30, 1);
  var track = get_random_number(10, 350, 5);
  var tas = get_random_number(80, 200, 1);
  var heading = track + to_degrees(Math.asin( (wind_speed / tas)) * Math.sin(to_radians(wind_dir - track)) );
  var groundspeed = Math.sqrt(Math.pow(wind_speed, 2) + Math.pow(tas, 2) - 2 * wind_speed * tas * Math.cos(to_radians(heading - wind_dir)));

  heading = fix_direction(round_number(heading, 1));
  groundspeed = round_number(groundspeed, 1);

  correct_answer = heading + '/' + groundspeed;

  var html = 'The TAS is ' + tas + ' kt with a wind velocity of ' + resolve_direction(wind_dir) + '/' + wind_speed + '. ';
  html += 'What heading must be flown to achieve a desired track of ' + resolve_direction(track) + ', and what will be the groundspeed?';

  html += '<br /><br />(Give heading in the range 001-360 and to the nearest degree. Give groundspeed to the nearest knot. ';
  html += 'Answer in the format heading/gs. All directions are assumed to be in degrees true.)';
  $('#question_text').html(html);

}
