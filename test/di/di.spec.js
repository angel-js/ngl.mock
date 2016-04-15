'use strict';

var expect = require('expect.js');
var di = require('../../src/di/di');

describe('di', function () {
  it('should expose a function', function () {
    expect(di).to.be.a('function');
  });

  it('should require an injectable param', function () {
    expect(di).to.throwException(function (exception) {
      expect(exception).to.be('missing mandatory injectable');
    });

    expect(di).withArgs(function () {}).to.not.throwException();
  });
});
