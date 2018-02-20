function Utilities () {


  this.to_radians = function (angle) { return (angle / 180) * Math.PI; }


  this.to_degrees = function (angle) { return (angle / Math.PI) * 180; }


  this.get_angle = function (x1, y1, x2, y2)
  {
    var x2 = x2 || 0;
    var y2 = y2 || 0;
    var dx = x1 - x2;
    var dy = y1 - y2;
    if (dy == 0) { dy = 0.00000001; }
    var my_angle = Math.atan(dx / dy);
    my_angle = this.to_degrees(my_angle);
    if (dy < 0) { my_angle = 180 + my_angle; } else if (dx < 0 && dy > 0) { my_angle = 360 + my_angle; }
    return my_angle;
  }


  this.random = function (min, max, step)
  {
    var min = min || 0;
    var max = max || 100;
  	var step = step || 1;
  	var range = max - min;
  	var num = min + (Math.random() * range);
  	num = this.round(num, step);
  	return num;
  }


  this.round = function (num, nearest)
  {
  	var factor = 1 / nearest;
  	var result = Math.round(num * factor) / factor;
  	return result;
  }


  this.randomize_array = function (my_array)
  {
  	//takes an array, shuffles elements and returns randomized array
  	var random_loops = my_array.length * 5;
  	for (var i = 0; i < random_loops; i++) {
  		var index_1 = Math.floor(Math.random() * my_array.length);
  		var index_2 = Math.floor(Math.random() * my_array.length);
  		var el_1 = my_array[index_1];
  		var el_2 = my_array[index_2];
  		my_array[index_1] = el_2;
  		my_array[index_2] = el_1;
  	}
  	return my_array;
  }


  this.get_url_param = function (param, def)
  {
  	var return_val = def || '';
  	var params = window.location.search.substring(1);
  	params = params.split('&');
  	for (var i = 0; i < params.length; i++) {
  		var this_param = params[i].split('=');
  		if (this_param[0] == param) { return this_param[1]; }
  	}
  	return def;
  }


  this.in_array = function (value, array) {
  	r = false;
  	for (var i = 0; i < array.length; i++) { if (value == array[i]) { r = true; } }
  	return r;
  }


  this.create_cookie = function (name, value)
  {
  	var days = 100;
  	var date = new Date();
  	date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  	var expires = "; expires=" + date.toGMTString();
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/;";
  }


  this.read_cookie = function (name)
  {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }











}
