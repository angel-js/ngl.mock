'use strict';

var args = require('./helpers/args');

var inlineArrayParser = function (recipe) {
  return {
    fn: recipe.pop(),
    deps: recipe
  };
};

var $injectParser = function (recipe) {
  return {
    fn: recipe,
    deps: recipe.$inject
  };
};

var fnParamParser = function (recipe) {
  return {
    fn: recipe,
    deps: args(recipe)
  };
};

var parse = function (recipe) {
  if (Array.isArray(recipe)) { return inlineArrayParser(recipe); }
  if (Array.isArray(recipe.$inject)) { return $injectParser(recipe); }
  return fnParamParser(recipe);
};

var injector = function (injections) {
  var get = function (dep) {
    return injections[dep];
  };

  return { get: get };
};

var di = function (recipe, injections) {
  var factory = parse(recipe);
  injections.$injector = injector(injections);

  return factory.fn.apply(null, factory.deps.map(function (dep) {
    return injections[dep];
  }));
};

module.exports = di;
