// JW Canvas Class
// v1.3: 22/3/2017
//    - Added this.to_radians and this.to_degrees (removes dependance on another library)
//    - Adder this.wedge function
// v1.2: 23/11/2016 - Added c.pixel and c.image
// v1.1: 23/11/2016 - Added get pixel
// v1.0: Added polyline

function Canvas (args) {

  var args = args || {};

  this.id = args.id || 'my_canvas';
  this.width = args.width || 500;
  this.height = args.height || 500;
  this.css = args.css || '';


  // default colors
  this.default = '#000000';
  this.black = '#000000';
  this.white = '#ffffff';
  this.red = '#e40f18';
  this.green = '#3fa535';
  this.blue = '#3e4899';
  this.orange = '#fdbc5f';
  this.yellow = '#ffef0f';
  this.purple = '#ccbfdf';
  this.brown = '#d0b7af';
  this.transparent = 'rgba(0,0,0,0)';

  //default values
  this.lineWidth = args.lineWidth || 1;
  this.strokeStyle = args.strokeStyle || this.default;
  this.fillStyle = args.fillStyle || 'rgba(0,0,0,0)';
  this.end = 'butt'; //butt, round, square
  this.font = args.font || 'Arial';
  this.fontSize = args.fontSize || 20;
  this.dash = args.dash || [];






  this.canvas = function () {
    var html = '<canvas id="' + this.id + '" width="' + this.width +'" height="' + this.height + '" style="' + this.css + '"></canvas>';
    document.write(html);
  }




  this.clear = function (color)
  {
    var context = this.context();
  	context.clearRect(0, 0, this.width, this.height);
    if (color) {
    	context.beginPath();
    	context.rect(0,0, this.width, this.height);
    	context.fillStyle = color;
    	context.fill();
    }
  }


  this.context = function () { return document.getElementById(this.id).getContext('2d'); }


  this.line = function (sX, sY, dX, dY, args)
  {

  	args = args || {};
    var strokeStyle = args.strokeStyle || this.strokeStyle;
  	var lineWidth = args.lineWidth || this.lineWidth;
  	var lineCap	= args.end || this.end; //butt, round, square
    var dash = args.dash || this.dash; //array of [dash length, gap length]

    var context = this.context();

    context.setLineDash(dash);
  	context.beginPath();
  	context.moveTo(sX, sY);
  	context.lineTo(dX, dY);
  	context.lineWidth = lineWidth;
  	context.strokeStyle = strokeStyle;
  	context.lineCap = lineCap;
  	context.stroke();

  }



  this.polyline = function (points, args)
  {

    args = args || {};
    var strokeStyle = args.strokeStyle || this.strokeStyle;
    var fillStyle	= args.fillStyle || this.fillStyle;
  	var lineWidth = args.lineWidth || this.lineWidth;
  	var lineCap	= args.end || this.end; //butt, round, square
    var dash = args.dash || this.dash; //array of [dash length, gap length]
    var closePath = args.closePath || false;

    var context = this.context();

    context.setLineDash(dash);
  	context.beginPath();

    context.moveTo(points[0][0], points[0][1]);

    for (var i = 1; i < points.length; i++) {
      context.lineTo(points[i][0], points[i][1]);
    }

    context.lineWidth = lineWidth;
  	context.strokeStyle = strokeStyle;
  	context.lineCap = lineCap;
    if (closePath) { context.closePath(); }
  	context.stroke();

    context.fillStyle = fillStyle;
    context.fill();

  }



  this.box = function (cX, cY, width, height, args)
  {

  	args = args || {};
    lineWidth = (args.lineWidth == 0) ? 0 : args.lineWidth || this.lineWidth;
  	strokeStyle = args.strokeStyle || this.strokeStyle;
  	fillStyle	= args.fillStyle || this.fillStyle;
    var dash = args.dash || this.dash; //array of [dash length, gap length]

    var context = this.context();

    context.setLineDash(dash);
  	context.beginPath();
  	context.rect(cX - (width/2), cY - (height/2), width, height);
  	context.fillStyle = fillStyle;
  	context.fill();
    if (lineWidth) {
      context.lineWidth = lineWidth;
      context.strokeStyle = strokeStyle;
      context.stroke();
    }

  }



  this.pixel = function (x, y, args)
  {

    var args = args || {};
    fillStyle = args.fillStyle || this.default;

    var context = this.context();
    context.beginPath();
    context.rect(x, y, 1, 1);
  	context.fillStyle = fillStyle;
  	context.fill();

  }



  this.loadImage = function ()
  {

    // this function is for reference only, it does not do anyting !!!
    var img = new Image();
    img.src = src;

    img.onload = function () {
    }

  }



  this.image = function (img, x, y)
  {
    this.context().drawImage(img, x, y);
  }



  this.rect = function (x1, y1, x2, y2, args)
  {

  	args = args || {};
    lineWidth = (args.lineWidth == 0) ? 0 : args.lineWidth || this.lineWidth;
  	strokeStyle = args.strokeStyle || this.strokeStyle;
  	fillStyle	= args.fillStyle || this.fillStyle;
    var dash = args.dash || this.dash; //array of [dash length, gap length]

    var context = this.context();

    context.setLineDash(dash);
  	context.beginPath();
    width = x2 - x1;
    height = y2 - y1;
  	context.rect(x1, y1, width, height);
  	context.fillStyle = fillStyle;
  	context.fill();
    if (lineWidth) {
      context.lineWidth = lineWidth;
      context.strokeStyle = strokeStyle;
      context.stroke();
    }

  }



  this.circle = function (oX, oY, radius, args)
  {

  	args = args || {};
    lineWidth = (args.lineWidth == 0) ? 0 : args.lineWidth || this.lineWidth;
  	strokeStyle = args.strokeStyle || this.strokeStyle;
  	fillStyle	= args.fillStyle || this.fillStyle;
    var dash = args.dash || this.dash; //array of [dash length, gap length]

    var context = this.context();

    context.setLineDash(dash);
  	context.beginPath();
  	context.arc(oX, oY, radius, 0, (2 * Math.PI), false);
  	context.fillStyle = fillStyle;
  	context.fill();
    if (lineWidth) {
      context.lineWidth = lineWidth;
      context.strokeStyle = strokeStyle;
      context.stroke();
    }

  }


  this.ellipse = function (oX, oY, width, height, args)
  {

    var args = args || {};
    lineWidth = (args.lineWidth == 0) ? 0 : args.lineWidth || this.lineWidth;
  	var strokeStyle = args.strokeStyle || this.strokeStyle;
  	var fillStyle	= args.fillStyle || this.fillStyle;
    var rotation = (args.rotation / 2) * Math.PI || 0;
    var dash = args.dash || this.dash; //array of [dash length, gap length]

    var context = this.context();

    context.setLineDash(dash);
  	context.beginPath();
  	context.ellipse(oX, oY, width, height, rotation, 0, (2 * Math.PI), false);
  	context.fillStyle = fillStyle;
  	context.fill();
    if (lineWidth) {
      context.lineWidth = lineWidth;
      context.strokeStyle = strokeStyle;
      context.stroke();
    }

  }



  this.arc = function (oX, oY, radius, start_angle, end_angle, args)
  {

  	args = args || {};
    lineWidth = (args.lineWidth == 0) ? 0 : args.lineWidth || this.lineWidth;
  	strokeStyle = args.strokeStyle || this.strokeStyle;
  	fillStyle	= args.fillStyle || this.fillStyle;
  	lineCap 	= args.end || this.end; //butt, round, square
  	closePath	= args.closePath || false;
  	counterclockwise = args.counterclockwise || false;
    dash = args.dash || this.dash;

  	//convert angles to radians
  	start_angle = this.to_radians(start_angle);
  	end_angle = this.to_radians(end_angle);

    var context = this.context();

    context.setLineDash(dash);
  	context.beginPath();
  	context.arc(oX, oY, radius, start_angle, end_angle, counterclockwise);

  	if (closePath) {
  		context.closePath();
  	}

  	if (fillStyle != '') {
  		context.fillStyle = fillStyle;
  		context.fill();
  	}

    if (lineWidth) {
      context.lineWidth = lineWidth;
      context.strokeStyle = strokeStyle;
      context.lineCap = lineCap;
      context.stroke();
    }

  }




  this.wedge = function (oX, oY, radius, start_angle, end_angle, args)
  {

    args = args || {};
    lineWidth = (args.lineWidth == 0) ? 0 : args.lineWidth || this.lineWidth;
  	strokeStyle = args.strokeStyle || this.strokeStyle;
  	fillStyle	= args.fillStyle || this.fillStyle;
  	lineCap 	= args.end || this.end; //butt, round, square
  	closePath	= args.closePath || false;
  	counterclockwise = args.counterclockwise || false;
    dash = args.dash || this.dash;

    //convert angles to radians
  	start_angle = this.to_radians(start_angle);
  	end_angle = this.to_radians(end_angle);

    var context = this.context();

    context.lineWidth = lineWidth;
  	context.strokeStyle = strokeStyle;
  	context.lineCap = lineCap;

    context.setLineDash(dash);
  	context.beginPath();

    //line
  	context.moveTo(oX, oY);
    var dX = radius * Math.cos(start_angle);
    var dY = radius * Math.sin(start_angle);
  	context.lineTo(oX + dX, oY + dY);

    //arc
    context.arc(oX, oY, radius, start_angle, end_angle, false);

    //line
    context.lineTo(oX, oY);

    //draw
    if (closePath) {
  		context.closePath();
  	}

  	if (fillStyle != '') {
  		context.fillStyle = fillStyle;
  		context.fill();
  	}

    if (lineWidth) {
      context.lineWidth = lineWidth;
      context.strokeStyle = strokeStyle;
      context.lineCap = lineCap;
      context.stroke();
    }

  }



  this.text = function (oX, oY, text, args)
  {

  	args = args || {};
  	lineWidth = args.lineWidth || 0;
  	strokeStyle = args.strokeStyle || this.fillStyle;
  	fillStyle = args.fillStyle || this.strokeStyle;
  	font = args.font || this.font;
  	fontSize = args.fontSize || this.fontSize;
    align = args.align || 'center';
    rotate = (args.rotate / 180) * Math.PI || false;
    dash = args.dash || this.dash;

    var context = this.context();

    context.strokeStyle = strokeStyle;
  	context.fillStyle = fillStyle;
    context.textAlign = align;
  	context.lineWidth = lineWidth;
  	context.font = fontSize + 'px ' + font;
    context.setLineDash(dash);

    if (rotate !== false) {
      context.save();
      context.translate(oX, oY);
      context.rotate(rotate);
      context.translate(-oX, -oY);
    }

    context.strokeText(text, oX, oY);
  	context.fillText(text, oX, oY);

    if (rotate !== false) { context.restore(); }

  }




  this.getPixel = function (x, y) {
    return this.context().getImageData(x, y, 1, 1).data;
  }




  this.random_color = function ()
  {

    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    var color = 'rgb(' + r + ',' + g + ',' + b + ')';
    return color;

  }



  this.to_radians = function (ang) { return (ang / 180) * Math.PI; }
  this.to_degrees = function (ang) { return (ang / Math.PI) * 180; }






}
