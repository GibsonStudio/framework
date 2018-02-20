


function generate_question ()
{

  $('#output').html('');
  $('#answer_input').val('');

  var ran = Math.floor(Math.random() * 4);

  if (ran == 0) {

    $('#question_type').html('m to ft');
    answer_accuracy = 10;

    var metres = get_random_number(100, 1000, 10);

    var html = 'How many feet are there in ' + metres + ' metres?';

    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' ft)';
    $('#question_text').html(html);

    correct_answer = metres * 3.2808;
    correct_answer = round_number(correct_answer, 1);

  } else if (ran == 1) {

    $('#question_type').html('Naut.m to Stat.m');
    answer_accuracy = 10;

    var naut_m = get_random_number(100, 1000, 10);

    var html = 'How many Statute Miles are there in ' + naut_m + ' Nautical Miles?';

    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' mile)';
    $('#question_text').html(html);

    correct_answer = naut_m * 1.151;
    correct_answer = round_number(correct_answer, 1);

  } else if (ran == 2) {

    $('#question_type').html('Stat.m to km');
    answer_accuracy = 10;

    var stat_m = get_random_number(100, 1000, 10);

    var html = 'How many kilometres are there in ' + stat_m + ' Statute Miles?';

    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' km)';
    $('#question_text').html(html);

    correct_answer = stat_m * 1.609;
    correct_answer = round_number(correct_answer, 1);

  } else {

    $('#question_type').html('Yards to Meters');
    answer_accuracy = 10;

    var yards = get_random_number(100, 1000, 10);

    var html = 'How many meters are there in ' + yards + ' yards?';

    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' m)';
    $('#question_text').html(html);

    correct_answer = yards * 0.914;
    correct_answer = round_number(correct_answer, 1);

  }


}
