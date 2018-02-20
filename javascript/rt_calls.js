
function add_rt_call (rt_call)
{

	var rt_call = rt_call || {};
	rt_call.type = rt_call.type || 'plane';
	rt_call.id = rt_call.id || 'rt_p1';
	rt_call.position = rt_call.position || 'left';
	rt_call.audio = rt_call.audio || rt_call.id;
	rt_call.text = rt_call.text || '';
	rt_call.image = rt_call.image || 'rt_' + rt_call.type + '_icon.png';
	rt_call.onstart = rt_call.onstart || '';
	rt_call.onended = rt_call.onended || '';
	rt_call.css = rt_call.css || '';

	rt_calls.push(rt_call);

	//do we need to add the audio object??
	if (!document.getElementById('my_audio')) {
		document.write('<audio id="my_audio" controls><source src="" type="audio/mp3"></audio>');
	}

	var html = '<div class="rt_call" onclick="play_rt_call(\'' + rt_call.id + '\')">';
	html += '<div class="rt_call_number">' + rt_calls.length + '</div>';
	html += '<div class="rt_call_icon rt_call_icon_' + rt_call.position + '"><img src="' + image_path() + '/rt/' +  rt_call.image + '" alt="icon" /></div>';
	html += '<div id="' + rt_call.id + '" class="rt_call_text rt_call_text_' + rt_call.type + ' rt_call_text_' + rt_call.position + '" style="' + rt_call.css + '"></div>';
	html += '</div>';

	document.write(html);

}





function play_rt_call (id)
{

	var rt = get_rt_call_from_id(id);
	var a = document.getElementById('my_audio');

	//run onplay?
	a.onplay = function () { eval(rt.onstart); }

	//add onended?
	a.onended = function () { eval(rt.onended); }

	//load and play audio
	a.pause();
	a.src = rt.audio + '.mp3';
	a.play();

	$('#' + rt.id).html(rt.text);

}




function get_rt_call_from_id (id)
{

	var rt = {};

	for (var i = 0; i < rt_calls.length; i++) {

		if (rt_calls[i].id == id) {
			return rt_calls[i];
		}

	}

	return rt;

}
