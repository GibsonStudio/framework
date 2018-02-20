


function generate_question ()
{

  $('#output').html('');
  $('#answer_input').val('');
  $('#question_type').html('Fuel Calculations');

  var ran = Math.floor(Math.random() * 3);

  if (ran == 0) {

    $('#question_type').html('Gallons');
    answer_accuracy = 10;

    var rate = get_random_number(5, 50, 1);
    var tme = get_random_number(20, 400, 5);

    var html = "With a fuel consumption of " + rate +" gallons per hour, how many gallons of fuel are used in " + tme + " minutes?";

    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' gal)';
    $('#question_text').html(html);

    correct_answer = (tme / 60) * rate;
    correct_answer = round_number(correct_answer, 1);

  } else if (ran == 1) {

    $('#question_type').html('Gallons per Hour');
    answer_accuracy = 1;

    var vol = get_random_number(25, 400,5);
    var tme = get_random_number(20, 400, 5);

    var html = "If " + vol +" gallons are used in " + tme + " minutes, what is the fuel consumption in gallons per hour?";

    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' gal/hr)';
    $('#question_text').html(html);

    correct_answer = (vol * 60) / tme;
    correct_answer = round_number(correct_answer, 1);

  } else {

    $('#question_type').html('Minutes');
    answer_accuracy = 1;

    var vol = get_random_number(2000, 10000, 100);
    var rate = get_random_number(100, 2000, 10);

    var html = "If the fuel consumption is " + rate + " gallons per hour, how many minutes will " + vol + " gallons of fuel last?";

    html += '<br /><br />(Answer accuracy: &#177;' + answer_accuracy + ' min)';
    $('#question_text').html(html);

    correct_answer = (vol * 60) / rate;
    correct_answer = round_number(correct_answer, 1);

  }


}
