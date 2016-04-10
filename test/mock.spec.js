'use strict';

var expect = require('expect.js');
var angular = require('../src/mock');

describe('angular', function () {
  it('should expose an object', function () {
    expect(angular).to.be.an('object');
  });

  it('should expose a reset method', function () {
    expect(angular.reset).to.be.a('function');
  });

  it('should expose a module method', function () {
    expect(angular.module).to.be.a('function');
  });

  describe('reset', function () {
    it('should reset the internal registry', function () {
      var test = angular.module('foo').factory;
      expect(test).to.not.throwException();
      angular.reset();

      expect(test).to.throwException(function (exception) {
        expect(exception).to.be('module foo is not available');
      });
    });
  });

  describe('module', function () {
    beforeEach(angular.reset);

    it('should require a module name param', function () {
      expect(angular.module).to.throwException('missing mandatory module name');
    });

    /**
     * `angular.module` API
     * <https://docs.angularjs.org/api/ng/type/angular.Module>
     */

    it('should expose a `provider` method', function () {
      expect(angular.module('foo').provider).to.be.a('function');
    });

    it('should expose a `factory` method', function () {
      expect(angular.module('foo').factory).to.be.a('function');
    });

    it('should expose a `service` method', function () {
      expect(angular.module('foo').service).to.be.a('function');
    });

    it('should expose a `value` method', function () {
      expect(angular.module('foo').value).to.be.a('function');
    });

    it('should expose a `constant` method', function () {
      expect(angular.module('foo').constant).to.be.a('function');
    });

    it('should expose a `decorator` method', function () {
      expect(angular.module('foo').decorator).to.be.a('function');
    });

    it('should expose an `animation` method', function () {
      expect(angular.module('foo').animation).to.be.a('function');
    });

    it('should expose a `filter` method', function () {
      expect(angular.module('foo').filter).to.be.a('function');
    });

    it('should expose a `controller` method', function () {
      expect(angular.module('foo').controller).to.be.a('function');
    });

    it('should expose a `directive` method', function () {
      expect(angular.module('foo').directive).to.be.a('function');
    });

    it('should expose a `component` method', function () {
      expect(angular.module('foo').component).to.be.a('function');
    });

    it('should expose a `config` method', function () {
      expect(angular.module('foo').config).to.be.a('function');
    });

    it('should expose a `run` method', function () {
      expect(angular.module('foo').run).to.be.a('function');
    });

    it('should expose a `requires` array', function () {
      expect(angular.module('foo').requires).to.be.an('array');
    });

    it('should expose a `name` string with the module name', function () {
      expect(angular.module('foo').name).to.be('foo');
    });
  });
});
