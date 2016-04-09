(function (expose) {
  'use strict';

  var getterSetter = function (model) {
    return function (key, value) {
      if (typeof value !== 'undefined') { model[key] = value; }
      return model[key];
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
      directive: getterSetter(entry.directives)
    };
  };

  expose('angular', { module: module });
})(function (name, module) {
  this[name] = module;
});
