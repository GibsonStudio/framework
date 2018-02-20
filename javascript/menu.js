

last_opened = '';


function toggle_tile (id)
{
	
	$('.tile').each(function () {
		$(this).removeClass('tile_active');
	});
	
	if (id != last_opened) {
		$('#' + last_opened).hide(200);
		$('#' + id).parent().addClass('tile_active');
		last_opened = id;
	} else {
		last_opened = '';
	}
		
	$('#' + id).toggle(200);

	if (id == 'uk' || id == 'ifr') {
		$("#tile_container").animate({scrollLeft: 10000}, 800);
	}
	
}




function open_lesson (file_path)
{
	
	var ext = file_path.substring(file_path.lastIndexOf('.'));
	
	if (ext != '.html') {
		file_path += '/index.html';
	}
	
	window.open(root_path() + 'content/' + file_path);
	event.stopPropagation();
	
}