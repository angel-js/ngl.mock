'use strict';

var expect = require('expect.js');
var parser = require('../../src/di/parser');

describe('parser', function () {
  it('should expose a function', function () {
    expect(parser).to.be.a('function');
  });
});

