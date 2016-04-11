ng-mock
=======

Angular unit testing made easy

### Featuring

  * run unit tests under nodejs
  * no DOM mocks required
  * angular.js not needed

Usage
-----

Suppose you have a `log` service like the following you want to test

**log.js**

```js
angular.module('log', [])

.factory('logCache', function () {
  return [];
})

.factory('log', function (logCache) {
  var log = function (msg) {
    if (typeof msg !== 'string') { msg = angular.toJson(msg, 2); }
    logCache.push(msg);
  };

  return log;
});
```

Let's write our unit tests using `ng-mock`

_([mocha][2] and [expect.js][3] used in the example)_

**log.spec.js**

Load `ng-mock` and the module to be tested

**`ng-mock` should me loaded first since it exposes the `angular` global
used by the tested module**

```js
var ngMock = require('ng-mock');
require('log.js');
```

The tests ...

```js
describe('log', function () {
  var logModule = ngMock.module('log');

  it('should expose a log service', function () {
    expect(logModule.factory('log')).to.be.a('function');
  });

  describe('log', function () {
    var cache = [];
    var log = logModule.factory('log')(cache);

    it('should be a function', function () {
      expect(log).to.be.a('function');
    });

    it('should add messages', function () {
      var msg = 'foo';
      log(msg);
      expect(cache[0]).to.be(msg);
    });
  });
});
```

### How does it work?

**ng-mock** mocks angular's module system so your scripts can use the mocked
version to register its factories and directives and your unit tests can load
them the same way **since all methods provided by `module` are getter/setters**

Install
-------

    npm install --save-dev ng-mock

API
---

### `angular.module(name)`

Returns an [angular.module][1]-compatible API

### `angular.reset()`

**For internal use**

Resets the internal module registry

This is used in our unit test to start with a clean registry `beforeEach` test

References
----------

  * [angular.module API][1]

[1]: https://docs.angularjs.org/api/ng/type/angular.Module
[2]: https://mochajs.org/
[3]: https://github.com/Automattic/expect.js
