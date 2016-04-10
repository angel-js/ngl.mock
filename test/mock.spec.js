'use strict';

var expect = require('expect.js');
var angular = require('../src/mock');

describe('angular', function () {
  it('should expose a module method', function () {
    expect(angular).to.be.an('object');
    expect(angular.module).to.be.a('function');
  });
});
