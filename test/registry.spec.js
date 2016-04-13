'use strict';

var expect = require('expect.js');
var registry = require('../src/registry');

describe('registry', function () {
  it('should expose an object', function () {
    expect(registry).to.be.an('object');
  });

  it('should expose a reset method', function () {
    expect(registry.reset).to.be.a('function');
  });

  it('should expose a module method', function () {
    expect(registry.module).to.be.a('function');
  });

  describe('reset', function () {
    it('should reset the internal registry', function () {
      var factory = registry.module('foo').factory;
      factory('bar', true);

      expect(factory).withArgs('bar').to.not.throwException();
      registry.reset();

      expect(factory).withArgs('bar').to.throwException(function (exception) {
        expect(exception).to.be('module foo is not available');
      });
    });
  });

  describe('module', function () {
    beforeEach(registry.reset);

    it('should require a name param', function () {
      expect(registry.module).to.throwException(function (exception) {
        expect(exception).to.be('missing mandatory module name');
      });

      expect(registry.module).withArgs('foo').to.not.throwException();
    });

    it('should return an `angular.Module`-compatible api', function () {
      expect(registry.module('foo')).to.be.an('object');
    });

    /**
     * `angular.Module` api
     * <https://docs.angularjs.org/api/ng/type/angular.Module>
     */

    describe('`angular.Module` api', function () {
      it('should expose a `provider` method', function () {
        expect(registry.module('foo').provider).to.be.a('function');
      });

      it('should expose a `factory` method', function () {
        expect(registry.module('foo').factory).to.be.a('function');
      });

      it('should expose a `service` method', function () {
        expect(registry.module('foo').service).to.be.a('function');
      });

      it('should expose a `value` method', function () {
        expect(registry.module('foo').value).to.be.a('function');
      });

      it('should expose a `constant` method', function () {
        expect(registry.module('foo').constant).to.be.a('function');
      });

      it('should expose a `decorator` method', function () {
        expect(registry.module('foo').decorator).to.be.a('function');
      });

      it('should expose an `animation` method', function () {
        expect(registry.module('foo').animation).to.be.a('function');
      });

      it('should expose a `filter` method', function () {
        expect(registry.module('foo').filter).to.be.a('function');
      });

      it('should expose a `controller` method', function () {
        expect(registry.module('foo').controller).to.be.a('function');
      });

      it('should expose a `directive` method', function () {
        expect(registry.module('foo').directive).to.be.a('function');
      });

      it('should expose a `component` method', function () {
        expect(registry.module('foo').component).to.be.a('function');
      });

      it('should expose a `config` method', function () {
        expect(registry.module('foo').config).to.be.a('function');
      });

      it('should expose a `run` method', function () {
        expect(registry.module('foo').run).to.be.a('function');
      });

      it('should expose a `requires` array', function () {
        expect(registry.module('foo').requires).to.be.an('array');
      });

      it('should expose a `name` string with the module name', function () {
        expect(registry.module('foo').name).to.be('foo');
      });
    });

    /**
     * Since all module methods share the same implementation,
     * we can abstract the test suite used
     */

    var moduleMethodTestSuite = function (method) {
      return function () {
        it('should require a name param', function () {
          var getterSetter = registry.module('foo')[method];
          getterSetter('bar', true);

          expect(getterSetter).to.throwException(function (exception) {
            expect(exception).to.be('missing mandatory ' + method + ' name');
          });

          expect(getterSetter).withArgs('bar').to.not.throwException();
        });

        it('should act as getter/setter', function () {
          var getterSetter = registry.module('foo')[method];

          var num = 123;
          var str = 'abc';
          var fn = function () {};

          getterSetter('bar', num);
          expect(getterSetter('bar')).to.be(num);

          getterSetter('bar', str);
          expect(getterSetter('bar')).to.be(str);

          getterSetter('bar', fn);
          expect(getterSetter('bar')).to.be(fn);
        });

        it('should require a set before a get', function () {
          var getterSetter = registry.module('foo')[method];

          expect(getterSetter).withArgs('bar')
          .to.throwException(function (exception) {
            expect(exception).to.be(method + ' not defined: bar');
          });

          getterSetter('bar', true);
          expect(getterSetter).withArgs('bar').to.not.throwException();
        });

        it('should be chainable when used as a setter', function () {
          var module = registry.module('foo');
          expect(module[method]('bar', true)).to.be(module);
        });
      };
    };

    describe('provider', moduleMethodTestSuite('provider'));
    describe('factory', moduleMethodTestSuite('factory'));
    describe('service', moduleMethodTestSuite('service'));
    describe('value', moduleMethodTestSuite('value'));
    describe('constant', moduleMethodTestSuite('constant'));
    describe('decorator', moduleMethodTestSuite('decorator'));
    describe('animation', moduleMethodTestSuite('animation'));
    describe('filter', moduleMethodTestSuite('filter'));
    describe('controller', moduleMethodTestSuite('controller'));
    describe('directive', moduleMethodTestSuite('directive'));
    describe('component', moduleMethodTestSuite('component'));
  });
});
