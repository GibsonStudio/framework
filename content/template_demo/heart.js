
var heart_rate;
var pulse_time; //milliseconds that heart is tense
var heart_state; //tense or relax


function ini_scene ()
{

	heart_rate = 80;
	pulse_time = 100;
	heart_state = 'relax';
	$('#heart_rate_slider').val(heart_rate);
	setTimeout(pulse_heart, pulse_time);
	
	update_heart();
	
}





function update_heart ()
{
	
	heart_rate = $('#heart_rate_slider').val();	
	$('#heart_rate_number').html(heart_rate);
	var flow_rate = (70 * heart_rate) / 1000;
	flow_rate = flow_rate.toFixed(1);
	$('#flow_rate').html(flow_rate);
	
	
}





function pulse_heart ()
{

	//tense or relax?
	
	if (heart_state == 'relax') {
	
		$('#heart_tense').show();
		heart_state = 'tense';
		setTimeout(pulse_heart, pulse_time);
		
	} else {
	
		$('#heart_tense').hide();
		heart_state = 'relax';		
		setTimeout(pulse_heart, (60000 / heart_rate) - pulse_time );
		
	}	

}







