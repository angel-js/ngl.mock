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

**`ng-mock` should be loaded first since it exposes the `angular` global
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

### Use our DI helper for seamless mock injection

Angular lets you declare provider dependencies in 3 different ways:

_from: [angular DI](https://docs.angularjs.org/guide/di)_

  * Using the inline array annotation (preferred)
  * Using the $inject property annotation
  * Implicitly from the function parameter names (has caveats)

```js
var module = angular.module('foo', []);

// inline array annotation
module.factory('bar', ['qux', function (qux) { ... }]);

// $inject property annotation
var bar = function (qux) { ... };
bar.$inject = ['qux'];
module.factory('bar', bar);

// function parameter names
module.factory('bar', function (qux) { ... });
```

Also, the injection can be in the form of `$injector.get`

```js
angular.module('foo')
.factory('bar', function ($injector) {
  var qux = $injector.get('qux');
});
```

Which in turn can also be injected with the 3 annotation methods described above

```js
angular.module('foo')
.factory('bar', ['$injector', function ($injector) {
  var qux = $injector.get('qux');
}]);
```

Since **ng-mock**'s `module` implementation returns basically a collection of
getter/setters, having to deal with this assortment of annotation interfaces can
be cumbersome

**Ugly unit tests without using the DI helper**

```js
describe('bar', function () {
  // get the bar factory function
  var barFactory = ngMock.module('foo').factory('bar');

  // suppose you have used inline array annotation style:
  // the function to test is the last array item
  var bar = barFactory[barFactory.length - 1];

  // dependencies we want to mock
  var mocks = {
    qux: function quxMock () { ... }
  };

  // suppose you have used `$injector.get`:
  // you will need to provide a mock for it!

  var get = function (dependency) {
    return mocks[dependency];
  };

  var $injector = { get: get };
  var bar = barFactory($injector);

  // your test starts here :(
  it('should be a function', function () {
    expect(bar).to.be.a('function');
  });
});
```

**Shinny unit tests using the DI helper**

```js
describe('bar', function () {
  // get the bar factory function
  var barFactory = ngMock.module('foo').factory('bar');

  // done!
  var bar = ngMock.di(barFactory, {
    qux: function quxMock () { ... }
  });
});
```

Install
-------

    npm install --save-dev ng-mock

API
---

### `reset()`

Resets the internal module registry

This is used in our unit test to start with a clean registry `beforeEach` test

### `module(name)`

Returns an [angular.module][1]-compatible API

### `di(injectable, injections)`

DI helper

References
----------

  * [angular.module API][1]

[1]: https://docs.angularjs.org/api/ng/type/angular.Module
[2]: https://mochajs.org/
[3]: https://github.com/Automattic/expect.js
