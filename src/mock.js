(function (expose) {
  'use strict';

  var noop = function () {};

  var iterateObject = function (object, fn) {
    for (var attr in object) { fn(object[attr], attr); }
  };

  var chain = function (api) {
    var chained = {};

    iterateObject(api, function (fn, name) {
      chained[name] = function () {
        var value = fn.apply(null, arguments);
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
    if (!registry[name]) { registry[name] = {}; }

    return chain({
      factory: getterSetter(name, 'factory'),
      directive: getterSetter(name, 'directive'),
      config: noop
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
