


function generate_question ()
{

  $('#output').html('');
  $('#answer_input').val('');

  var ran = Math.floor(Math.random() * 2);

  if (ran == 0) {

    $('#question_type').html('Kilograms to Pounds');
    answer_accuracy = 1;

    var kg = get_random_number(20, 200, 1);

    var html = 'How many pounds are there in ' + kg + ' kg?';

    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' lb)';
    $('#question_text').html(html);

    correct_answer = kg * 2.2046;
    correct_answer = round_number(correct_answer, 1);

  } else {

    $('#question_type').html('Pounds to Kilograms');
    answer_accuracy = 1;

    var lb = get_random_number(20, 200, 1);

    var html = 'How many kilograms are there in ' + lb + ' lb?';

    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' kg)';
    $('#question_text').html(html);

    correct_answer = lb / 2.2046;
    correct_answer = round_number(correct_answer, 1);

  }

}
