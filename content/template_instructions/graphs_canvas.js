

$(document).ready(function () {

  // example 1
  var ex1 = new Graph({
    canvas_id: 'example_1',
    x_pix_max: 600,
    y_pix_min: 380,
    x_min: -360,
    x_max: 360,
    y_min: -1,
    y_max: 1
  });

  ex1.draw_axis();


  // example 2
  var ex2 = new Graph({
    canvas_id: 'example_2',
    x_pix_max: 600,
    y_pix_min: 380,
    x_min: -360,
    x_max: 360,
    y_min: -1,
    y_max: 1,
    x_step: 90,
    y_step: 0.2,
    x_show_numbers: true
  });

  ex2.draw_axis();


  // exmaple 3
  var ex3 = new Graph({
    canvas_id: 'example_3',
    x_pix_max: 600,
    y_pix_min: 380,
    x_min: -360,
    x_max: 360,
    y_min: -1,
    y_max: 1,
    x_step: 90,
    y_step: 0.2,
    x_show_numbers: true
  });

  ex3.draw_axis();
  ex3.draw_sin({ strokeStyle:'#df0000' });





  // example 4
  var ex4 = new Graph({
    canvas_id: 'example_4',
    x_pix_max: 400,
    y_pix_min: 400,
    x_min: -10,
    x_max: 10,
    y_min: -10,
    y_max: 100,
    x_step: 1,
    y_step: 10,
    x_show_numbers: true,
    y_show_numbers: true
  });

  ex4.draw_axis();




  // example 5
  var ex5 = new Graph({
    canvas_id: 'example_5',
    x_pix_max: 400,
    y_pix_min: 400,
    x_min: -10,
    x_max: 10,
    y_min: -10,
    y_max: 100,
    x_step: 1,
    y_step: 10,
    x_show_numbers: true,
    y_show_numbers: true
  });

  ex5.draw_axis();

  var prev_x = 0;
  var prev_y = 0;
  for (var i = ex5.x_min; i <= ex5.x_max; i += 0.1) {
    var x = i;
    var y = x * x;
    if (i > ex5.x_min) { draw_line(ex5.get_x(prev_x), ex5.get_y(prev_y), ex5.get_x(i), ex5.get_y(y), { canvas_id:ex5.canvas_id, strokeStyle: '#df0000' }); }
    prev_x = i;
    prev_y = y;
  }




  // example 6
  var ex6 = new Graph({
    canvas_id: 'example_6',
    x_pix_max: 400,
    y_pix_min: 400,
    x_min: -10,
    x_max: 10,
    y_min: -10,
    y_max: 100,
    x_step: 1,
    y_step: 10,
    x_show_numbers: true,
    y_show_numbers: true
  });

  ex6.draw_axis();
  ex6.draw_line(-5, 2, 9, 80, { lineWidth:3, strokeStyle: '#116d31' });



  console.log('ready....');

});
