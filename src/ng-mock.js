(function (expose) {
  'use strict';

  var chain = require('./helpers/chain');
  var noop = function () {};

  var registry = {};

  var reset = function () {
    registry = {};
  };

  var getterSetter = function (module, collection) {
    return function (key, value) {
      var entry = registry[module];
      if (!entry) { throw 'module ' + module + ' is not available'; }

      if (!entry[collection]) { entry[collection] = {}; }
      var model = entry[collection];

      if (typeof value === 'undefined') { return model[key]; }
      model[key] = value;
    };
  };

  var module = function (name) {
    if (!name) { throw 'missing mandatory module name'; }
    if (!registry[name]) { registry[name] = {}; }

    return chain({
      provider: getterSetter(name, 'provider'),
      factory: getterSetter(name, 'factory'),
      service: getterSetter(name, 'service'),
      value: getterSetter(name, 'value'),
      constant: getterSetter(name, 'constant'),
      decorator: getterSetter(name, 'decorator'),
      animation: getterSetter(name, 'animation'),
      filter: getterSetter(name, 'filter'),
      controller: getterSetter(name, 'controller'),
      directive: getterSetter(name, 'directive'),
      component: getterSetter(name, 'component'),
      config: noop,
      run: noop,
      requires: [],
      name: name
    });
  };

  expose('angular', {
    reset: reset,
    module: module
  });
})(function (name, api) {
  module.exports = api;
  global[name] = api;
});
