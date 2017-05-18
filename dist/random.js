'use strict';
/**
  Example:
    var seed = random();
*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = random;
var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var numeric = "0123456789";
var alphanumeric = alpha + numeric;
var any = alphanumeric + "*-&+%$!";

function random(len, seed) {
  if (!len) len = 8;
  var choices = any;
  switch (seed) {
    case "alpha":
      choices = alpha;
      break;
    case "numeric":
      choices = numeric;
      break;
    case "alphanumeric":
      choices = alphanumeric;
      break;
  }

  var rand = "";
  for (var i = 0; i < len; i++) {
    rand += choices.charAt(Math.floor(Math.random() * choices.length));
  }
  return rand;
}

module.exports = exports["default"];