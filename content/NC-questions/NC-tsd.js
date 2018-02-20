


function generate_question ()
{

  $('#output').html('');
  $('#answer_input').val('');

  var ran = Math.floor(Math.random() * 3);

  if (ran == 0) {

    $('#question_type').html('Time');
    answer_accuracy = 1;

    var speed = get_random_number(50, 200, 5);
    var distance = get_random_number(150, 400, 10);

    var html = 'Your calculated speed is ' + speed + ' knots and the distance to fly is ';
    html += distance + ' Nautical Miles. How many minutes will the flight last?';

    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' min)';
    $('#question_text').html(html);

    correct_answer = (distance / speed) * 60;
    correct_answer = round_number(correct_answer, answer_accuracy);


  } else if (ran == 1) {

    $('#question_type').html('Speed');
    answer_accuracy = 1;

    var tme = get_random_number(30, 200, 1);
    var distance = get_random_number(150, 400, 10);

    var html = 'In ' + tme + ' minutes you have covered ' + distance + ' Nautical Miles. What is your groundspeed in Knots?';
    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' kt)';
    $('#question_text').html(html);

    correct_answer = (60 / tme) * distance;
    correct_answer = round_number(correct_answer, answer_accuracy);

  } else {

    $('#question_type').html('Distance');
    answer_accuracy = 10;

    var tme = get_random_number(30,200, 1);
    var speed = get_random_number(100, 600, 10);

    var html = 'How many Nautical Miles would you travel in ' + tme + ' minutes at a speed of ' + speed + ' Knots?';
    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' naut.m)';
    $('#question_text').html(html);

    correct_answer = (tme / 60) * speed;
    correct_answer = round_number(correct_answer, 1);

  }

}
