'use strict';

var args = require('./args');
var isArray = Array.isArray;

var tokens = function (fn, deps) {
  if (typeof fn !== 'function') {
    throw 'invalid injectable function';
  }

  if (!isArray(deps)) {
    throw 'invalid injectable dependecies';
  }

  return { fn: fn, deps: deps };
};

var inlineArrayParser = function (injectable) {
  var fn = injectable.pop();
  var deps = injectable;
  return tokens(fn, deps);
};

var $injectParser = function (injectable) {
  var fn = injectable;
  var deps = fn.$inject;
  return tokens(fn, deps);
};

var fnParamParser = function (injectable) {
  var fn = injectable;
  var deps = args(fn);
  return tokens(fn, deps);
};

var parser = function (injectable) {
  if (isArray(injectable)) {
    return inlineArrayParser(injectable);
  }

  if (isArray(injectable.$inject)) {
    return $injectParser(injectable);
  }

  if (typeof injectable === 'function') {
    return fnParamParser(injectable);
  }

  throw 'unknown injectable type';
};

module.exports = parser;
