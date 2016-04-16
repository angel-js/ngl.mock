'use strict';

var expect = require('expect.js');
var error = require('../../src/helpers/error');

describe('error', function () {
  it('should expose a function', function () {
    expect(error).to.be.a('function');
  });
});
