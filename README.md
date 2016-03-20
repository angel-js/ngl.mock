ngl.mock
========

Angular 1.x mock for running unit tests under nodejs without mocking the DOM

Overview
--------

```js
angular.module('log', [])
.factory('logModel', function () {
  return [];
})
.factory('log', function (logModel) {
  var log = function (msg) {
    if (typeof msg !== 'string') { msg = angular.toJson(msg, 2); }
    logModel.push(msg);
  };

  return log;
})
.directive('log', function (logModel) {
  var controller = function ($scope) {
    $scope.log = logModel;
  };

  var template = '<div ng-repeat="msg in log track by $index">{{ msg }}</div>';

  return {
    scope: true,
    controller: controller,
    template: template
  };
});
```

**ngl.mock** lets you write your unit tests as an angular module **without using
angular at all**

```js
angular.module('log').test(function (inject) {
  describe('log service', function () {
    var mocks = {
      logModel: []
    };

    var log = inject.factory('log', mocks);

    it('should be a function', function () {
      expect(log).to.be.a('function');
    });

    it('should add messages', function () {
      var msg = 'foo';
      log(msg);
      expect(mocks.logModel[0]).to.be(msg);
    });
  });

  describe('log directive', function () {
    var mocks = {
      logModel: []
    };

    var log = inject.directive('log', mocks);

    it('should have a controller function', function () {
      expect(log).to.be.an('object');
      expect(log.controller).to.be.a('function');
    });

    it('should expose messages', function () {
      var ctrlMocks = {
        $scope: {}
      };

      var controller = inject(log.controller, ctrlMocks);
      expect(ctrlMocks.$scope.log).to.be(mocks.logModel);
    });
  });
});
```

Usage
-----

 1. Concatenate your source files and your unit tests.
 2. Ensure **ngl.mock** is concatenated first
 3. Run the bundle with your preferred test runner

Enjoy unit testing your angular modules!

**ngl.mock** supports the following angular DI idioms:

  * arguments name _(default)_
  * `$injector.get`
  * `[ 'foo', 'bar' function (foo, bar) { ... }]`
  * `(function (foo, bar) { ... }).$inject = [ 'foo', 'bar' ]`
