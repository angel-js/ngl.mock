var angular = (function (env) {
  'use strict';
  
  var di = function (fn) {
    // TODO
  };

  var factory = function (name, fn) {
    // TODO
  };

  var directive = function (name, fn) {
    // TODO
  };

  var describe = function (desc, fn) {
    env.describe(desc, di(fn));
  };

  var module = function (name, deps) {
    return {
      factory: factory,
      directive: directive,
      describe: describe
    };
  };

  return {
    module: module
  };
})({
  describe: describe
});
