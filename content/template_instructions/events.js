

function ini_events()
{

	document.getElementById('my_button').addEventListener('mousedown', click_button);
	
	//demo button
	document.getElementById('demo_button').addEventListener('mousedown', function () { $('#demo_output').html('mousedown'); } );
	document.getElementById('demo_button').addEventListener('mouseup', function () { $('#demo_output').html('mouseup'); } );
	//document.getElementById('demo_button').addEventListener('mousemove', function () { $('#demo_output').html('mousemove'); } );
	document.getElementById('demo_button').addEventListener('mouseover', function () { $('#demo_output').html('mouseover'); } );
	document.getElementById('demo_button').addEventListener('mouseout', function () { $('#demo_output').html('mouseout'); } );
	
	document.body.addEventListener('mousemove', function (e) {
		$('#mouse_position').html(e.pageX + ',' + e.pageY);
	} );
	
	document.getElementById('method_1').addEventListener('mousemove', function (e) {
		var my_x = e.pageX - $('#method_1').offset().left;
		var my_y = e.pageY - $('#method_1').offset().top;
		$('#method_1').html(my_x + ',' + my_y);
	} );
	
	document.body.addEventListener('mousemove', function (e) {
		var my_x = e.pageX - $('#method_2').offset().left;
		var my_y = e.pageY - $('#method_2').offset().top;
		$('#method_2').html(my_x + ',' + my_y);
	} );
	
}




function click_button ()
{
	alert("You clicked my_button");
}