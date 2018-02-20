

//tiles
var tile_rows = 4;
var tile_cols = 4;
var tile_size = 100; //pixel size of tiles - must be square!
var tile_margin = 10; //margin between tiles
var my_tiles = []; //the array of tile objects available to the game
var game_tiles = []; //tiles used in the games - shuffled instance of my_tiles

//game_logic
var status = '';
var points_array = [10, 6, 4, 2, 0]; //points a tile is worth after each click
var score = 0;
var tiles_open = 0;
var open_tile = {}; //the 1st tile of an opened pair
var reset_delay = 1000;
var pairs_correct = 0; //used to track when game is complete
var my_timeout;


function ini_game ()
{
	
	status = 'initializing';
	clearTimeout(my_timeout);
	score = 0;
	tiles_open = 0;
	pairs_correct = 0;
	open_tile = {};
	$('#score').html('Score: 0');
	
	add_tiles();
	
}


function add_tiles ()
{
	
	//set tile_container size:
	var tile_container_width = (tile_cols * tile_size) + (tile_cols * tile_margin) + tile_margin;
	var tile_container_height = (tile_rows * tile_size) + (tile_rows * tile_margin) + tile_margin;
	
	$('#tile_container').css({ width: tile_container_width + 'px', height: tile_container_height + 'px' });
	$('#my_container').css({ width: tile_container_width + 300 + 'px', height: tile_container_height + 'px' });
	$('#score_container').css({ height: tile_container_height + 'px' });
	
	//get randomized tiles
	game_tiles = get_randomized_tiles();
	
	//add tiles to container
	var row = 1;
	var col = 1;
	
	var html = '';
	
	var tile_count = Math.min((tile_rows * tile_cols), game_tiles.length);
	
	for (var i = 0; i < tile_count; i++) {
	
		var my_x = tile_margin + ((tile_size + tile_margin) * (col - 1));
		var my_y = tile_margin + ((tile_size + tile_margin) * (row - 1));
		
		var me = game_tiles[i];
		
		html += '<div class="tile tile_active" id="' + me.id + '" onclick="tile_clicked(\'' + me.id + '\')" style="width:' + tile_size + 'px; height:' + tile_size + 'px; left:' + my_x + 'px; top:' + my_y + 'px;"></div>';

		col++;
		
		if (col > tile_cols) {
			col = 1;
			row++;
		}
		
	}
	
	$('#tile_container').html(html);

	status = 'ready';
	
}






function tile_clicked (tile_id)
{

	var me = get_tile_by_id(tile_id);
	
	if (me.active && status == 'ready') {
	
		//set inactive
		set_tile_value(me, 'active', false);
		
		//set style
		$('#' + tile_id).addClass('tile_selected').removeClass('tile_active');
		
		//open this tile
		tiles_open++;
		$('#' + me.id).css({ background: 'url(memory_game/' + me.image + ')' });
	
		//are 2 tiles now open, i.e. do we need to process open tiles?
		if (tiles_open >= 2) {

			process_tiles(open_tile, me);
			
		} else {
		
			//must be the 1st of an opened pair
			
			open_tile = me;
			
		}
		
	}
	
}





function process_tiles (tile_1, tile_2)
{
	
	status = 'processing_tiles';
	
	var tile_1_index = get_tile_index(game_tiles, tile_1);
	var tile_2_index = get_tile_index(game_tiles, tile_2);
	
	if (tile_1.group == tile_2.group) {
	
		//correct
		
		//deactivate tiles
		tile_1.active = false;
		tile_2.active = false;
		$('#' + tile_1.id).addClass('tile_inactive').removeClass('tile_selected');
		$('#' + tile_2.id).addClass('tile_inactive').removeClass('tile_selected');
		
		//add score
		var score_index_1 = Math.min(points_array.length, tile_1.times_opened);
		var score_index_2 = Math.min(points_array.length, tile_2.times_opened);
		var points_1 = points_array[score_index_1] || 0;
		var points_2 = points_array[score_index_2] || 0;
		score = score + points_1 + points_2;
		$('#score').html('Score: ' + score);
		
		//is game over?
		pairs_correct++;
		
		if (pairs_correct >= (tile_rows * tile_cols) / 2) {
			$('#score').html('Game Over<br /><br />Final Score: ' + score);
			status = 'finished';
		}
		
		//reset for next go
		status = 'ready';
		tiles_open = 0;
		
		
	} else {
	
		//wrong
		
		//increment counters
		tile_1.times_opened++;
		tile_2.times_opened++;
		
		status = 'resetting';
		my_timeout = setTimeout(function () {
		
			set_tile_value(tile_1, 'active', true);
			set_tile_value(tile_2, 'active', true);
			$('#' + tile_1.id).css({ background: 'url(memory_game/door.png)' }).addClass('tile_active').removeClass('tile_selected');
			$('#' + tile_2.id).css({ background: 'url(memory_game/door.png)' }).addClass('tile_active').removeClass('tile_selected');
			tiles_open = 0;
			open_tile = {};
			status = 'ready';
			
		}, reset_delay);
		
		
	}
	
	//update tiles in game_tiles
	game_tiles[tile_1_index] = tile_1;
	game_tiles[tile_2_index] = tile_2;
	
}




function set_tile_value (t_tile, key, val)
{

	var tile_index = get_tile_index(game_tiles, t_tile);
	game_tiles[tile_index][key] = val;

}



function get_tile_index ( t_array, t_tile)
{

	var index = -1;
	
	for (var i = 0; i < t_array.length; i++) {
		if (t_array[i].id == t_tile.id) {
			index = i;
			break;
		}
	}
	
	return index;
	
}




function get_tile_by_id ( tile_id )
{

	var me = {};
	
	for (var i = 0; i < my_tiles.length; i++ ) {
	
		if (my_tiles[i].id == tile_id) {
			me = my_tiles[i];
			break;
		}
		
	}
	
	return me;

}





function get_randomized_tiles ()
{

	//define available tiles in matching pairs
	my_tiles = [];
	
	for (var i = 1; i <= 8; i++) {
	
		var me = {};
		me.id = 'tile_' + ((i * 2) - 1);
		me.group = 'pair_' + i;
		me.image = 'tile_' + ((i * 2) - 1) + '.png';
		me.active = true;
		me.times_opened = 0;
		my_tiles.push(me);
		
		var me = {};
		me.id = 'tile_' + (i * 2);
		me.group = 'pair_' + i;
		me.image = 'tile_' + (i * 2) + '.png';
		me.active = true;
		me.times_opened = 0;
		my_tiles.push(me);
	
	}

	var tile_count = Math.min((tile_rows * tile_cols), my_tiles.length);
	var t_tiles = my_tiles.slice(0, tile_count);
	//shuffle(t_tiles);
	
	t_tiles = randomize_array(t_tiles); //randomize_array() is in javascript/interactive.js
	
	return t_tiles;

}






