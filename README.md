ngl.mock
========

Angular 1.x mock for running unit tests under nodejs without mocking the DOM

Usage
-----

**ngl.mock** mocks angular's module system so your scripts can use the mocked
version to register its factories and directives and your unit tests can load
them the same way since all methods provided by `module` are getter/setters

For example, having module with some factories and directives

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

Using **ngl.mock** you can write unit tests like the following

```js
describe('module:log', function () {
  var module = angular.module('log');

  describe('factory:log', function () {
    var mock = { model: [] };
    var log = module.factory('log')(mock.model);

    it('should be a function', function () {
      expect(log).to.be.a('function');
    });

    it('should add messages', function () {
      var msg = 'foo';
      log(msg);
      expect(mock.model[0]).to.be(msg);
    });
  });
});
```

Setup
-----

 1. Concatenate your source files and your unit tests.
 2. Ensure **ngl.mock** is concatenated first
 3. Run the bundle with your preferred test runner

Enjoy unit testing your angular modules!
