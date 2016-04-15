'use strict';

var removeSpaces = function (str) {
  return str.replace(/ /g, '');
};

var argsDefinition = function (str) {
  return removeSpaces(str.split(/[()]/)[1]);
};

var args = function (fn) {
  var argsStr = argsDefinition(fn.toString());
  if (!argsStr.length) { return []; }
  return argsStr.split(',');
};

module.exports = args;
