ngl.mock
========

Angular 1.x mock for running unit tests under nodejs without mocking the DOM

Overview
--------

Having angular modules spreaded across several files, loaded from `index.html`
either with multiple `<script>` tags or concatenated in a single tag..

_(The following example would be better written using a single module. It is
over modularized on purpose for the sake of argument)_
.

```js
angular.module('log.model', [])
.factory('logModel', function () {
  return [];
});
```

```js
angular.module('log.service', [ 'log.model' ])
.factory('log', function (logModel) {
  var log = function (msg) {
    if (typeof msg !== 'string') { msg = angular.toJson(msg, 2); }
    logModel.push(msg);
  };

  return log;
});
```

```js
angular.module('log.directive', [ 'log.model' ])
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

**ngl.mock** lets you write your unit tests like another standard angular
module **without using angular at all**

```js
angular.module('log.service.spec', [ 'log.service' ])
.run(function (log) {
  it('should be a function', function () {
    expect(log).to.be.a('function');
  });
});
```

Concat your source files and your unit tests. Ensure **ngl.mock** is
concatenated first

Run the bundle with your preferred test runner

Enjoy unit testing your angular modules!

**ngl.mock** supports all angular DI idioms:

  * arguments name by using `Function::toString`
  * `$injector.get`
  * `[ 'foo', 'bar' function (foo, bar) { ... }]`
  * `(function (foo, bar) { ... }).$inject = [ 'foo', 'bar' ]`
