(function (expose) {
  'use strict';

  var noop = function () {};

  var chain = function (api) {
    var chained = {};
    var method = null;

    for (method in api) {
      chained[method] = function () {
        var value = api[method].apply(null, arguments);
        if (typeof value !== 'undefined') { return value; }
        return chained;
      };
    }

    return chained;
  };

  var getterSetter = function (model) {
    return function (key, value) {
      if (typeof value === 'undefined') { return model[key]; }
      model[key] = value;
    };
  };

  var registry = {};

  var module = function (name) {
    if (!registry[name]) {
      registry[name] = {
        factories: {},
        directives: {}
      };
    }

    var entry = registry[name];

    return chain({
      factory: getterSetter(entry.factories),
      directive: getterSetter(entry.directives),
      config: noop
    });
  };

  expose('angular', { module: module });
})(function (name, module) {
  this[name] = module;
});
