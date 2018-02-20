

var radio_bu_origin_x = 336;
var radio_bu_origin_y = 173;

var radio_knob_active = false;
var radio_knob_big_ang = 0;
var radio_knob_small_ang = 0;
var radio_rotation_offset = 0;
var radio_last_ang = 0;
var radio_required_ang_diff = 20;

var radio_freq_use = 120.00;
var radio_freq_stby = 136.500;
var radio_freq_min = 118;
var radio_freq_max = 137;
var radio_freq_required = radio_freq_stby;

var radio_digits = 5; //5 or 6
var radio_25_inc = 0.025;
var radio_833_inc = 0.005;
var radio_inc = radio_833_inc; //0.025 for 25 kHz spacing, 0.005 for 8.33 kHz spacing



//audio object
var radio_audio_object = {};
radio_audio_object.index = 0;
radio_audio_object.objects = [];




function radio_ini ()
{

  radio_set_digits(5);
  radio_set_spacing(25);
  radio_show_use_frequency();
  radio_show_stby_frequency();

  document.getElementById('radio-knob-big').addEventListener('mousedown', function (e) { radio_start_knob_big(e); } );
  document.getElementById('radio-knob-small').addEventListener('mousedown', function (e) { radio_start_knob_small(e); } );
  document.addEventListener('mouseup', function (e) { radio_stop_all(e); });
  document.addEventListener('mousemove', function (e) { radio_move_me(e); });

  radio_ask_question();

}






/* ******** radio knobs ******** */

function radio_start_knob_big (e)
{

  e.preventDefault();
	eX = e.pageX || e.touches[0].pageX;
	eY = e.pageY || e.touches[0].pageY;

  mouse_x = eX - $('#radio').offset().left - radio_bu_origin_x;
	mouse_y = eY - $('#radio').offset().top - radio_bu_origin_y;

  radio_rotation_offset = get_angle_between(0, 0, mouse_x, mouse_y) - radio_knob_big_ang;
  radio_knob_active = 'big';

}




function radio_start_knob_small (e)
{

  e.preventDefault();
	eX = e.pageX || e.touches[0].pageX;
	eY = e.pageY || e.touches[0].pageY;

  mouse_x = eX - $('#radio').offset().left - radio_bu_origin_x;
	mouse_y = eY - $('#radio').offset().top - radio_bu_origin_y;

  radio_last_ang = radio_knob_small_ang;
  radio_rotation_offset = get_angle_between(0, 0, mouse_x, mouse_y) - radio_knob_small_ang;
  radio_knob_active = 'small';

}




function radio_move_me (e)
{

  mouse_x = e.pageX - $('#radio').offset().left - radio_bu_origin_x;
	mouse_y = e.pageY - $('#radio').offset().top - radio_bu_origin_y;

  var ang = get_angle_between(0, 0, mouse_x, mouse_y);
  var knob_ang = 0;

  if (radio_knob_active == 'big') {
		radio_knob_big_ang = ang - radio_rotation_offset;
    knob_ang = radio_knob_big_ang;
		$('#radio-knob-big').rotate(radio_knob_big_ang);
	}

  if (radio_knob_active == 'small') {
		radio_knob_small_ang = ang - radio_rotation_offset;
    knob_ang = radio_knob_small_ang;
		$('#radio-knob-small').rotate(radio_knob_small_ang);
	}

  if (radio_knob_active) {

    var diff = knob_ang - radio_last_ang;
    if (Math.abs(diff) >= 180) { diff = -diff; }

    if (Math.abs(diff) >= radio_required_ang_diff) {

      radio_last_ang = knob_ang;
      radio_change_frequency(radio_knob_active, diff);

    }

  }

}



function radio_knob_big (dir)
{

  if (dir == 'up') {
    radio_freq_stby++;
  } else {
    radio_freq_stby--;
  }

  radio_limit_frequency();
  radio_show_stby_frequency();

}



function radio_knob_small (dir)
{

  if (dir == 'up') {
    radio_freq_stby = (radio_validate_frequency((radio_freq_stby + radio_inc), 'up'));
  } else {
    radio_freq_stby = (radio_validate_frequency((radio_freq_stby - radio_inc), 'down'));
  }

  radio_limit_frequency();
  radio_show_stby_frequency();

}



function radio_stop_all (e)
{
  radio_knob_active = false;
}

/* **** end of radio knobs **** */











/* ******** radio functions ******** */

function radio_set_spacing (spacing)
{

  if (spacing == 25) {

    //set 25 kHz spacing
    radio_inc = radio_25_inc;
    $('#radio-spacing-toggle').css({'background':'url(radio_toggle_up.png)'});
    $('#radio-spacing-label').html('25 kHz');

  } else {

    //set 8.33 kHz spacing
    radio_inc = radio_833_inc;
    $('#radio-spacing-toggle').css({'background':'url(radio_toggle_down.png)'});
    $('#radio-spacing-label').html('8.33 kHz');
    radio_set_digits(6); //8.33 kHz spacing has to be a 6 digit radio

  }

  //remove decimals from frequencies and re-display
  if (radio_digits == 5) {
    radio_freq_use = parseInt(radio_freq_use);
    radio_freq_stby = parseInt(radio_freq_stby);
  }
  radio_show_use_frequency();
  radio_show_stby_frequency();

}


function radio_toggle_spacing ()
{
  if (radio_inc == 0.025) {
    radio_set_spacing(833);
  } else {
    radio_set_spacing(25);
  }
}


function radio_set_digits (digit_count)
{

  if (digit_count == 6) {

    //set 6 digit
    radio_digits = 6;
    $('#radio-use-ghost').html('888.888');
    $('#radio-stby-ghost').html('888.888');
    $('#radio-digits-toggle').css({'background':'url(radio_toggle_down.png)'});
    $('#radio-digits-label').html('6 Digit');

  } else {

    //set 5 digit
    radio_digits = 5;
    $('#radio-use-ghost').html('888.88');
    $('#radio-stby-ghost').html('888.88');
    $('#radio-digits-toggle').css({'background':'url(radio_toggle_up.png)'});
    $('#radio-digits-label').html('5 Digit');
    radio_set_spacing(25); //5 digit cannot be 8.33 kHz

  }

  radio_show_use_frequency();
  radio_show_stby_frequency();

}


function radio_toggle_digits ()
{
  if (radio_digits == 5) {
    radio_digits = 6;
  } else {
    radio_digits = 5;
  }
  radio_set_digits(radio_digits);
}



function radio_swap_frequencies ()
{

  var t_freq = radio_freq_use;
  radio_freq_use = radio_freq_stby;
  radio_freq_stby = t_freq;

  radio_show_use_frequency();
  radio_show_stby_frequency();
  radio_check_answer();

}


function radio_show_use_frequency ()
{

  var t_freq = radio_freq_use.toFixed(3).substring(0, radio_digits + 1);


  while (t_freq.length < radio_digits + 1) {
    t_freq += '0';
  }

  $('#radio-use').html(t_freq);

}



function radio_show_stby_frequency ()
{

  var t_freq = radio_freq_stby.toFixed(3).substring(0, radio_digits + 1);


  while (t_freq.length < radio_digits + 1) {
    t_freq += '0';
  }

  $('#radio-stby').html(t_freq);

}



function radio_change_frequency (knob, diff)
{

  if (Math.abs(diff) > 100) { return false; } //stops false increments when crossing angle origin

  if (diff > 0) {

    //change UP
    if (knob == 'big') { radio_knob_big('up'); } else { radio_knob_small('up'); }

  } else if (diff < 0) {

    //change down
    if (knob == 'big') { radio_knob_big('down'); } else { radio_knob_small('down'); };

  }

}


/* **** end of radio functions **** */












/* ******** frequency functions ******** */

function radio_limit_frequency ()
{

  if (radio_freq_stby >= radio_freq_max) {
    radio_freq_stby = radio_freq_min + (radio_freq_stby % 1);
  } else if (radio_freq_stby < radio_freq_min) {
    radio_freq_stby = radio_freq_max - 1 + (radio_freq_stby % 1);
  }

}


function radio_fix_frequency (freq)
{

  //make sure frequency is a float
  freq = parseFloat(freq);

  //fix spurious decimals
  freq = freq.toFixed(3).substring(0, radio_digits + 1);

  return freq;

}



function radio_validate_frequency (freq, dir)
{

  //set default rounding
  dir = dir || 'up';

  //make sure frequency id a float
  freq = parseFloat(freq);

  //make sure frequency is valid - radios can't select xxx.x20, xxx.x45, xxx.x70 or xxx.x95
  var dc = ((freq * 10) % 1).toFixed(2);

  if (dc == 0.2 || dc == 0.45 || dc == 0.7 || dc == 0.95) {

    if (dir == 'up') {
      freq = parseFloat(freq) + radio_833_inc;
    } else {
      freq = parseFloat(freq) - radio_833_inc;
    }

  }

  return freq;

}

/* **** end of frequency functions **** */













/* ******** question logic ******** */

function radio_ask_question ()
{

  radio_freq_required = radio_get_random_frequency();
  radio_say_frequency(radio_freq_required);

}



function radio_check_answer ()
{

  if (radio_fix_frequency(radio_freq_use) == radio_fix_frequency(radio_freq_required)) {

    radio_ask_question();

  } else {

    var a = document.getElementById('radio_audio');
  	a.pause();
    a.onended = '';
  	a.src = 'radio_pink_noise.mp3';
  	a.play();

  }

}




function radio_get_random_frequency ()
{

  //get integer component
  var t_freq = radio_freq_min + Math.floor(Math.random() * (radio_freq_max - radio_freq_min));

  //get decimal component
  var possible_decimal_count = 1 / radio_inc;
  var decimal_index = Math.floor(Math.random() * possible_decimal_count);
  var decimal_component = radio_inc * decimal_index;

  t_freq = radio_validate_frequency(t_freq + decimal_component, 'up');
  t_freq = radio_fix_frequency(t_freq);

  return t_freq;

}




function radio_say_again ()
{
  radio_say_frequency(radio_freq_required);
}


/* **** end of question logic **** */


























/* ******** audio functions ******** */


function radio_say_frequency (freq) //expects float
{

  freq = parseFloat(radio_fix_frequency(freq));
  f_string = freq.toString();

  if (freq % 1 < 0.0001) {

    //interger - add 1 training zero
    f_string += '.0';

  } else if ((freq * 10) % 1 < 0.0001) {

    //1 non-zero dp - nothing to add

  } else {

    //need to add training zeros
    while (f_string.length < radio_digits + 1) {
      f_string += '0';
    }

  }

  //ini audio object
  radio_audio_object.index = 0;
  radio_audio_object.objects = f_string.split('');
  radio_audio_object.objects.unshift('cf'); //include "change frequency to"?

  radio_process_audio_queue();

}



function radio_process_audio_queue ()
{

  var a = document.getElementById('radio_audio');
  a.pause();
  a.onended = '';

  var this_char = radio_audio_object.objects[radio_audio_object.index];

  //add onended?
  if (radio_audio_object.index < radio_audio_object.objects.length - 1) {
    a.onended = function () { radio_process_audio_queue(); };
  }

  if (this_char == 'cf') {
    a.src = 'radio_change_frequency.mp3';
  } else if (this_char == '.') {
    a.src = 'radio_day_see_mal.mp3';
  } else {
    a.src = 'radio_' + this_char + '.mp3';
  }

	a.play();

  radio_audio_object.index++;

}

/* **** end of audio functions **** */














/* ******** utility functions ******** */


function get_angle_between (x1, y1, x2, y2) {
	var x = x2 - x1;
	var y = y1 - y2;
	//stop divide by zero error
	if (y ==0) {
		y = 0.000000001;
	}
	var angle = Math.atan(x/y);
	angle = angle * (180 / Math.PI);
	if ( x2 > x1 && y2 > y1 ) {
		angle = 180 + angle;
	} else if ( x2 < x1 && y2 > y1 ) {
		angle = 180 + angle;
	} else if ( x2 < x1 && y2 < y1 ) {
		angle = 360 + angle;
	}
	//keep in the range 0 - 360
	if (angle < 0) {
		angle = angle + 360;
	} else if (angle > 360) {
		angle = angle - 360;
	}
	return angle;
}






//
