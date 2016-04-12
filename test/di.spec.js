'use strict';

var expect = require('expect.js');
var di = require('../src/di');

describe('di', function () {
  it('should expose a function', function () {
    expect(di).to.be.a('function');
  });
});
