(function (expose) {
  'use strict';

  var noop = function () {};

  var iterateObject = function (object, fn) {
    var attr = '';
    for (attr in object) { fn(object[attr], attr); }
  };

  var chain = function (api) {
    var chained = {};

    iterateObject(api, function (prop, name) {
      chained[name] = typeof prop !== 'function' ? prop : function () {
        var value = prop.apply(null, arguments);
        if (typeof value !== 'undefined') { return value; }
        return chained;
      };
    });

    return chained;
  };

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
  if (module && module.exports) { module.exports = api; }
  this[name] = api;
});
