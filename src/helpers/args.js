'use strict';

var removeSpaces = function (str) {
  return str.replace(/ /g, '');
};

var argsDefinition = function (str) {
  return removeSpaces(str.split(/()/)[1]);
};

var args = function (fn) {
  return argsDefinition(fn.toString()).split(',');
};

module.exports = args;
