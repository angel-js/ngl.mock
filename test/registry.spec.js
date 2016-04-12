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
      var test = registry.module('foo').factory;
      expect(test).to.not.throwException();
      registry.reset();

      expect(test).to.throwException(function (exception) {
        expect(exception).to.be('module foo is not available');
      });
    });
  });

  describe('module', function () {
    beforeEach(registry.reset);

    it('should require a module name param', function () {
      expect(registry.module).to.throwException('missing mandatory module name');
    });

    it('should return an `angular.Module`-compatible object', function () {
      expect(registry.module('foo')).to.be.an('object');
    });

    /**
     * `angular.Module` API
     * <https://docs.angularjs.org/api/ng/type/angular.Module>
     */

    describe('`angular.Module` API', function () {
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
  });
});
