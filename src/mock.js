(function (expose) {
  'use strict';

  var noop = function () {};

  var getterSetter = function (model) {
    return function (key, value) {
      if (typeof value === 'undefined') { return model[key]; }
      model[key] = value;
      return this;
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

    return {
      factory: getterSetter(entry.factories),
      directive: getterSetter(entry.directives),
      config: noop
    };
  };

  expose('angular', { module: module });
})(function (name, module) {
  this[name] = module;
});
