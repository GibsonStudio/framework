function ImageSliderV (args) {

  var args = args || {};

  this.id             = args.id || 'image-slider-' + Math.ceil(Math.random() * 1000000);
  this.width          = args.width || 500;
  this.height         = args.height || 500;
  this.imageTop       = args.imageTop || '';
  this.imageBottom    = args.imageBottom || '';

  this.buttonSize     = args.buttonSize || 20;
  this.buttonColor    = args.buttonColor || '#3e4899';
  this.lineWidth      = args.lineWidth || 2;
  this.lineColor      = args.lineColor || this.buttonColor;

  this.containerCss   = args.containerCss || 'margin:auto; margin-bottom:' + (this.buttonSize) + 'px; border:2px solid ' + this.buttonColor + ';';

  this.linePosition = args.linePosition === undefined ? 0.5 : args.linePosition;
  this.linePosition = this.height * this.linePosition;

  this.active = false;


  this.html = function ()
  {

    //container
    var html = '<div id="' + this.id + '-container" style="width:' + this.width + 'px; height:' + this.height + 'px; position: relative;' + this.containerCss + '">';

    //image bottom
    html += '<div id="' + this.id + '-image-bottom" style="position: absolute; width:' + this.width + 'px; height:' + this.height + 'px; left: 0px; top: 0px; background-image: url(' + this.imageBottom + ');"></div>';

    //image top
    html += '<div id="' + this.id + '-image-top" style="position: absolute; width:' + this.width + 'px; height:' + this.linePosition + 'px; left: 0px; top: 0px; background-image: url(' + this.imageTop + ');"></div>';

    //line
    html += '<div id="' + this.id + '-line" style="width:' + this.width + 'px; height:' + this.lineWidth + 'px; position:absolute; left: 0px; top:' + (this.linePosition - (this.lineWidth / 2)) + 'px; background-color:' + this.lineColor + '; "></div>';

    //button
    html += '<div id="' + this.id + '-button" style="width:' + this.buttonSize + 'px; height:' + this.buttonSize + 'px; position:absolute; right:-' + (this.buttonSize / 2) +'px; top:' + (this.linePosition - (this.buttonSize / 2)) + 'px; background-color:' + this.buttonColor + '; cursor:pointer; border-radius:' + this.buttonSize + 'px;"></div>';

    html += '</div>';

    return html;

  };


  this.init = function ()
  {

    var scope = this;
    document.write(this.html());
    document.getElementById(this.id + '-button').addEventListener('mousedown', function (e) { scope.start(e); } );
    document.getElementById(this.id + '-line').addEventListener('mousedown', function (e) { scope.start(e); } );
    document.addEventListener('mouseup', function (e) { scope.stop(e) } );
    document.addEventListener('mousemove', function (e) { scope.move(e); } );

  };


  this.init();


  this.start = function (e) { e.preventDefault(); this.active = true; };
  this.stop = function (e) { e.preventDefault(); this.active = false; };


  this.move = function (e)
  {

    e.preventDefault();

    if (this.active) {

      var y = e.pageY - $('#' + this.id + '-container').offset().top;
      y = Math.max(0, Math.min(y, $('#' + this.id + '-container').height()));

      var button_y = y - ($('#' + this.id + '-button').height() / 2);
      $('#' + this.id + '-button').css({ top: button_y + 'px' });

      var line_y = y - ($('#' + this.id + '-line').height() / 2);
      $('#' + this.id + '-line').css({ top: line_y + 'px' });

      $('#' + this.id + '-image-top').height(line_y);

    }

  };

}
