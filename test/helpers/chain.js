'use strict';

var expect = require('expect.js');
var chain = require('../../src/helpers/chain');

describe('chain', function () {
  it('should expose a function', function () {
    expect(chain).to.be.a('function');
  });
});
