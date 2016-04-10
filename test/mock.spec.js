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

    it('should require a module name param');
  });
});
