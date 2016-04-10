ngl.mock
========

Angular 1.x mock for running unit tests under nodejs without mocking the DOM

Usage
-----

```js
angular.module('app.log', [])

.factory('appLogModel', function () {
  return [];
})

.factory('appLog', function (appLogModel) {
  var log = function (msg) {
    if (typeof msg !== 'string') { msg = angular.toJson(msg, 2); }
    appLogModel.push(msg);
  };

  return log;
});
```

```js
describe('app.log', function () {
  var module = angular.module('app.log');

  describe('appLog', function () {
    var model = [];
    var log = module.factory('appLog')(model);

    it('should be a function', function () {
      expect(log).to.be.a('function');
    });

    it('should add messages', function () {
      var msg = 'foo';
      log(msg);
      expect(model[0]).to.be(msg);
    });
  });
});
```

How does it work?
-----------------

**ngl.mock** mocks angular's module system so your scripts can use the mocked
version to register its factories and directives and your unit tests can load
them the same way since all methods provided by `module` are getter/setters

Install
-------

    bower install --save-dev ngl.mock

 1. Concatenate your source files and your unit tests.
 2. Ensure **ngl.mock** is concatenated first
 3. Run the bundle with your preferred test runner

Enjoy unit testing your angular modules!

API
---

### `angular.module(name)`

Returns an `angular.module`-compatible API

### `angular.reset()`

**For internal use**

Resets the internal module registry

This is used in our unit test to start with a clean registry `beforeEach` test
