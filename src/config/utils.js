window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function(callback, element){
      return window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimFrame = ( function() {
  return window.cancelAnimationFrame         ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame    ||
    window.oCancelRequestAnimationFrame      ||
    window.msCancelRequestAnimationFrame     ||
      clearTimeout
})();
window.collection = window.collection || {};

Math.clamp = function(value, start, end) {
  if(value < start) return start;
  else if(value > end) return end;
  else return value;
};

//Limits a value between 0 and 1 .
Math.clamp01 = function(value) {
  if(value < 0) return 0;
  else if(value > 1) return 1;
  else return value;
};

String.prototype.stringToSlug = function() {
  var str = this;
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();
  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
   .replace(/\s+/g, '+') // collapse whitespace and replace by -
   .replace(/-+/g, '-'); // collapse dashes
  return str;
};

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.DecodeHtmlString = function(){
  var temp = document.createElement("textarea");
  temp.innerHTML = this;
  return temp.value;
}

// Redirect
let host     = location.protocol + "//" + location.host + "/";
let last     = window.location.href.replace(host, "");
let redirect = host + "#/" + last;

if (!window.location.href.match(/#/g)) {
  window.location = redirect;
}