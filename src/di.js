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
    if (typeof injections[dep] === 'undefined') {
      throw 'missing dependency: ' + dep;
    }

    return injections[dep];
  };

  return { get: get };
};

var di = function (recipe, mocks) {
  var factory = parse(recipe);
  var fn = factory.fn;
  var deps = factory.deps;
  var injections = mocks || {};

  if (!injections.$injector) {
    injections.$injector = injector(injections);
  }

  return fn.apply(null, deps.map(injections.$injector.get));
};

module.exports = di;
