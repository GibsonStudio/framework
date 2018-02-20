

function submit (id)
{
  var val = $('#input_' + id).val();
  $('#output_' + id).html("You clicked box " + id + ' and entered ' + val);
}



function draw_box (id)
{
  var html = '<div class="floater_row">';
  html += 'What is ' + id + ' + ' + id + ': ';
  html += '<input id="input_' + id + '" type="number" />';
  html += '<button class="button_small" onclick="submit(' + id + ')">Submit</button>';
  html += '<div class="row_output" id="output_'+ id + '"></div></div>'
  document.write(html);
}
