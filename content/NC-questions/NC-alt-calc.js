


function generate_question ()
{

  $('#output').html('');
  $('#answer_input').val('');

  var ran = Math.floor(Math.random() * 2);

  if (ran == 0) {

    $('#question_type').html('True Altitude');
    answer_accuracy = 100;

    var indicated_alt = get_random_number(5000, 15000, 500);
    var pressure_alt = get_random_number(10, 1000, 10) + indicated_alt;
    var temp = get_random_number(-14, 0, 1);

    var html = 'Indicated Altitude is ' + indicated_alt + ' ft, Pressure Altitude is ' + pressure_alt + ' ft, and the temperature is ' + temp + '&deg;C. What is your True Altitude?';

    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' ft)';
    $('#question_text').html(html);

    correct_answer = indicated_alt * (1 + 0.004 * (temp - 15.0 + ((pressure_alt / 1000.0) * 1.98)));
    correct_answer = round_number(correct_answer, 1);


  } else {

    $('#question_type').html('Density Altitude');
    answer_accuracy = 100;

    var pressure_alt = get_random_number(10000, 30000, 500);
    var temp = get_random_number(-20, 0, 1);
    var isa = temp - (15.0 - ((pressure_alt / 1000.0) * 1.98));

    var html = 'Pressure Altitude is ' + pressure_alt + ' ft, and the corrected temperature is ' + temp + '&deg;C. What is your Density Altitude?';

    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' ft)';
    $('#question_text').html(html);

    correct_answer = pressure_alt + (isa * 120.0);
    correct_answer = round_number(correct_answer, 1);

  }

}
