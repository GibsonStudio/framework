


function generate_question ()
{

  $('#output').html('');
  $('#answer_input').val('');

  var ran = Math.floor(Math.random() * 5);

  if (ran == 0) {

    $('#question_type').html('Litres to Kilograms');
    answer_accuracy = 5;

    var sg = get_random_number(0.7, 0.9, 0.01);
    var litres = get_random_number(50, 1000, 10);

    var html = 'What is the weight (in kg) of ' + litres + ' litres of fuel with a specific gravity of ' + sg + '?';

    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' kg)';
    $('#question_text').html(html);

    correct_answer = litres * sg;
    correct_answer = round_number(correct_answer, 1);

  } else if (ran == 1) {

    $('#question_type').html('Litres to Pounds');
    answer_accuracy = 5;

    var sg = get_random_number(0.7, 0.9, 0.01);
    var litres = get_random_number(50, 1000, 10);

    var html = 'What is the weight (in lb) of ' + litres + ' litres of fuel with a specific gravity of ' + sg + '?';

    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' lb)';
    $('#question_text').html(html);

    correct_answer = litres * sg * 2.2046;
    correct_answer = round_number(correct_answer, 1);


  } else if (ran == 2) {

    $('#question_type').html('US Gallons to Pounds');
    answer_accuracy = 5;

    var sg = get_random_number(0.7, 0.9, 0.01);
    var us_gal = get_random_number(20, 150, 1);

    var html = 'What is the weight (in lb) of ' + us_gal + ' US.gal of fuel with a specific gravity of ' + sg + '?';

    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' lb)';
    $('#question_text').html(html);

    correct_answer = us_gal * sg * (5.0/6.0) * 10;
    correct_answer = round_number(correct_answer, 1);

  } else if (ran == 3) {

    $('#question_type').html('Imperial Gallons to Pounds');
    answer_accuracy = 5;

    var sg = get_random_number(0.7, 0.9, 0.01);
    var imp_gal = get_random_number(20, 150, 1);

    var html = 'What is the weight (in lb) of ' + imp_gal + ' imp.gal of fuel with a specific gravity of ' + sg + '?';

    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' lb)';
    $('#question_text').html(html);

    correct_answer = imp_gal * sg * 10;
    correct_answer = round_number(correct_answer, 1);

  } else {

    $('#question_type').html('Imperial Gallons to Litres');
    answer_accuracy = 10;

    var imp_gal = get_random_number(100, 1000, 10);

    var html = 'How many litres are there in ' + imp_gal + ' imp.gal?';

    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' litres)';
    $('#question_text').html(html);

    correct_answer = imp_gal * 4.546;
    correct_answer = round_number(correct_answer, 1);

  }


}
