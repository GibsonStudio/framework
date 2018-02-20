

var altitude = 4000;
var subscale = 1013;
var pressure = 1000;
var indicated_altitude = 3000;
var frame_rate = 30.0;



$(document).ready(function () {

	update_screen();
	
});





function update_screen ()
{
	
	//read values from sliders
	altitude = document.sliders.altitude.value * 1.0;
	pressure = document.sliders.pressure.value * 1.0;
	subscale = document.sliders.subscale.value * 1.0;
	
	//show values to user
	$('#altitude_value').html('<b>Altitude:</b> ' + parseInt(altitude) + ' ft');
	$('#pressure_value').html('<b>Pressure:</b> ' + parseInt(pressure) + ' mb');
	$('#subscale_value').html('<b>Subscale:</b> ' + subscale + ' mb');
	
	//show subscale
	show_subscale(subscale);
	
	//calculate indicated altitude and dispplay on instrument
	show_altitude();
	
	//shpw debug info
	//debug();
	
	//call next frame
	setTimeout(update_screen, (1000.0 / frame_rate) );
	
	
}




function show_altitude()
{
	
	//calculate indicated_altitude
	var pressure_diff = subscale - pressure;
	var alt_inc = pressure_diff * 30.0;
	indicated_altitude = (altitude * 1.0) + alt_inc; 
	 
	//move needles to correct position
	 
	//100s needle
	var rot = (indicated_altitude / 1000.0) * 360;
	$('#needle_100').rotate(rot);
	
	//1000s needle
	rot = (indicated_altitude / 10000.0) * 360;
	$('#needle_1000').rotate(rot);
	
	//10,000s needle
	rot = (indicated_altitude / 100000.0) * 360;
	$('#needle_10000').rotate(rot);
		
}




function show_subscale (value)
{
	
	var ang = ( (value - 950) / (100) ) * -300;
	$('#subscale').rotate(ang);
	
	//rotate knob
	$('#subscale_knob').rotate(ang);
}



/*
function debug ()
{
	
	var h = '';
	h += 'Altitude: ' + altitude + '<br/>';
	h += 'Subscale: ' + subscale + '<br/>';
	h += 'Pressure: ' + pressure + '<br/>';
	h += 'Indicated Alt: ' + indicated_altitude + '<br/>';
	$('#debug').html(h);
	
}
*/




