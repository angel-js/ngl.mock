'use strict';

var expect = require('expect.js');
var args = require('../../src/helpers/args');

describe('args', function () {
  it('should expose a function', function () {
    expect(args).to.be.a('function');
  });
});
