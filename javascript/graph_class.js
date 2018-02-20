function Graph (args) {

  var args = args || {};

  //x axis
  this.x_min = args.x_min || 0;
  this.x_max = args.x_max || 100;
  this.x_pix_min = args.x_pix_min || 0;
  this.x_pix_max = args.x_pix_max || 500;
  this.x_step = args.x_step || 0;
  this.x_fixed = args.x_fixed || 'default';
  this.x_show_numbers = args.x_show_numbers || false;

  //y axis
  this.y_min = args.y_min || 0;
  this.y_max = args.y_max || 100;
  this.y_pix_min = args.y_pix_min || 500;
  this.y_pix_max = args.y_pix_max || 0;
  this.y_step = args.y_step || 0;
  this.y_fixed = args.y_fixed || 'default';
  this.y_show_numbers = args.y_show_numbers || false;

  //canvas
  this.canvas_id = args.canvas_id || 'my_canvas';
  this.axis_color = args.axis_color || '#c2c2c2';
  this.color = args.color || '#3e4899';

  //misc
  this.graduation_line_length = args.graduation_line_length || 10;
  this.graduation_font_size = args.graduation_font_size || 10;


  this.get_x = function (x)
  {
    var px = ((this.x_pix_max - this.x_pix_min) / (this.x_max - this.x_min)) * x;
    var ox = this.get_ox();
    var rx = ox + px;
    return rx;
  }


  this.get_y = function (y)
  {
    var py = ((this.y_pix_min - this.y_pix_max) / (this.y_min - this.y_max)) * y;
    var oy = this.get_oy();
    var ry = (oy + py);
    return ry;
  }


  this.get_ox = function ()
  {
    var range = this.x_max - this.x_min;
    var pix_range = this.x_pix_max - this.x_pix_min;
    var pix_factor = pix_range / range;
    var ox = Math.abs(this.x_min * pix_factor);
    return ox;
  }


  this.get_oy = function ()
  {
    var range = this.y_min - this.y_max;
    var pix_range = this.y_pix_max - this.y_pix_min;
    var pix_factor = pix_range / range;
    var oy = Math.abs(this.y_max * pix_factor);
    return oy;
  }


  this.x_to_pixels = function (x)
  {
    var range = this.x_max - this.x_min;
    var pix_range = this.x_pix_max - this.x_pix_min;
    var pix_factor = pix_range / range;
    var pix = x * pix_factor;
    return pix;
  }


  this.y_to_pixels = function (y)
  {
    var range = this.y_min - this.y_max;
    var pix_range = this.y_pix_max - this.y_pix_min;
    var pix_factor = pix_range / range;
    var pix = y * pix_factor;
    return pix;
  }


  this.pixels_to_x = function (pix)
  {
    var range = this.x_max - this.x_min;
    var pix_range = this.x_pix_max - this.x_pix_min;
    var pix_factor = pix_range / range;
    var x = pix / pix_factor;
    return x;
  }


  this.pixels_to_y = function (pix)
  {
    var range = this.y_min - this.y_max;
    var pix_range = this.y_pix_max - this.y_pix_min;
    var pix_factor = pix_range / range;
    var y = pix / pix_factor;
    return y;
  }


  this.draw_axis = function ()
  {

    draw_line(this.x_pix_min, this.get_oy(), this.x_pix_max, this.get_oy(), { canvas_id:this.canvas_id, lineWidth:1, strokeStyle:this.axis_color });
    draw_line(this.get_ox(), this.y_pix_min, this.get_ox(), this.y_pix_max, { canvas_id:this.canvas_id, lineWidth:1, strokeStyle:this.axis_color });

    var ox = this.get_ox();
    var oy = this.get_oy();

    // lines on x axis
    if (this.x_step != 0) {
      var x_line_length = this.pixels_to_y(this.graduation_line_length);
      for (var i = this.x_step; i <= this.x_max; i += this.x_step) {
        var x_text = i;
        if (this.x_fixed != 'default') { x_text = x_text.toFixed(this.x_fixed); }
        this.draw_line(i, 0, i, -x_line_length, { canvas_id:this.canvas_id, strokeStyle:this.axis_color });
        if (this.x_show_numbers) {
          draw_text(this.get_x(i) - (this.graduation_font_size / 2), this.get_y(-x_line_length)+this.graduation_font_size, x_text, { canvas_id:this.canvas_id, fontSize: this.graduation_font_size, fillStyle:this.axis_color });
        }
      }
      for (var i = -this.x_step; i >= this.x_min; i -= this.x_step) {
        var x_text = i;
        if (this.x_fixed != 'default') { x_text = x_text.toFixed(this.x_fixed); }
        this.draw_line(i, 0, i, -x_line_length, { canvas_id:this.canvas_id, strokeStyle:this.axis_color });
        if (this.x_show_numbers) {
          draw_text(this.get_x(i) - (this.graduation_font_size / 1.6), this.get_y(-x_line_length)+this.graduation_font_size, x_text, { canvas_id:this.canvas_id, fontSize: this.graduation_font_size, fillStyle:this.axis_color });
        }
      }
    }

    // lines on y axis
    if (this.y_step != 0) {
      var y_line_length = this.pixels_to_x(this.graduation_line_length);
      for (var i = this.y_step; i <= this.y_max; i += this.y_step) {
        var y_text = i;
        if (this.y_fixed != 'default') { y_text = y_text.toFixed(this.y_fixed); }
        this.draw_line(0, i, -y_line_length, i, { canvas_id:this.canvas_id, strokeStyle:this.axis_color });
        if (this.y_show_numbers) {
          draw_text(ox - this.graduation_line_length - (this.graduation_font_size * 2), this.get_y(i) + (this.graduation_font_size / 3), y_text, { canvas_id:this.canvas_id, fontSize: this.graduation_font_size, fillStyle:this.axis_color });
        }
      }
      for (var i = -this.y_step; i >= this.y_min; i -= this.y_step) {
        var y_text = i;
        if (this.y_fixed != 'default') { y_text = y_text.toFixed(this.y_fixed); }
        this.draw_line(0, i, -y_line_length, i, { canvas_id:this.canvas_id, strokeStyle:this.axis_color });
        if (this.y_show_numbers) {
          draw_text(ox - this.graduation_line_length - (this.graduation_font_size * 2), this.get_y(i) + (this.graduation_font_size / 3), y_text, { canvas_id:this.canvas_id, fontSize: this.graduation_font_size, fillStyle:this.axis_color });
        }
      }
    }

  }


  this.draw_line = function (x1, y1, x2, y2, args)
  {
    var args = args || {};
    args.strokeStyle = args.strokeStyle || this.color;
    args.lineWidth = args.lineWidth || 1;
    draw_line(this.get_x(x1), this.get_y(y1), this.get_x(x2), this.get_y(y2), { canvas_id:this.canvas_id, lineWidth:args.lineWidth, strokeStyle:args.strokeStyle } );
  }


  this.draw_sin = function (args)
  {

    //demo function that draws a sine wave

    var args = args || {};
    var color = args.strokeStyle || this.color;

    var prev_x = 0;
    var prev_y = 0;

    for (var i = this.x_min; i <= this.x_max; i += 2) {

      //get angle as radians and calculate y
      var x = (i / 180) * Math.PI;
      var y = Math.sin(x);

      if (i > this.x_min) { draw_line(this.get_x(prev_x), this.get_y(prev_y), this.get_x(i), this.get_y(y), { canvas_id:this.canvas_id, strokeStyle:color }); }

      prev_x = i;
      prev_y = y;

    }

  }





}
