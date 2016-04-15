'use strict';

var parser = require('./parser');

var injector = function (injections) {
  var get = function (dep) {
    if (typeof injections[dep] === 'undefined') {
      throw 'missing dependency: ' + dep;
    }

    return injections[dep];
  };

  return { get: get };
};

var di = function (injectable, injections) {
  if (typeof injectable === 'undefined') {
    throw 'missing mandatory injectable';
  }

  var parsed = parser(injectable);
  var fn = parsed.fn;
  var deps = parsed.deps;

  injections = injections || {};

  if (!injections.$injector) {
    injections.$injector = injector(injections);
  }

  return fn.apply(null, deps.map(injections.$injector.get));
};

module.exports = di;
