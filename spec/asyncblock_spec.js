var asyncBlock = require('jasmine-asyncblock')(jasmine);
var asyncSpec = function(spec) {
  return function() {
    asyncBlock(spec, {
      waitsFor: "test to finish running",
      timeout: 500
    });
  }
};

describe ("asyncBlock", function() {
  var spec = null

  beforeEach(function() {
    spec = jasmine.getEnv().currentSpec;
  });

  it ("runs the given block", function() {
    var blockRun = false;
    asyncBlock(function(done) {
      blockRun = true;
      done();
    });
    expect(blockRun).toBeFalsy();
    runs(function() {
      expect(blockRun).toBeTruthy();
    });
  });

  it ("fails the spec when the callback is given an argument", function() {
    asyncBlock(function(done) {
      done("PASS: this is an expected failure message");
    });
    runs(function() {
      expect(spec.results().failedCount).toEqual(1);
    });
  });

  it ("waits for done to be called", function() {
    var blockRun = false;
    asyncBlock(function(done) {
      setTimeout(function() {
        blockRun = true;
        done();
      }, 50);
    });
    runs(function() {
      expect(blockRun).toBeTruthy();
    });
  });

  it ("times out", function() {
    asyncBlock(function(done) {
      setTimeout(function() {
        done("block didn't timeout as expected");
      }, 1000);
    }, {
      timeout: 500,
      message: "PASS: this is an expected failure message"
    });
  });

});

