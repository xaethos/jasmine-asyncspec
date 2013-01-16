var asyncSpec = require('jasmine-asyncspec')(jasmine);

describe ("asyncSpec", function() {
  var spec = null

  beforeEach(function() {
    spec = jasmine.getEnv().currentSpec;
  });

  it ("runs the given block", function() {
    var blockRun = false;
    asyncSpec(function(done) {
      blockRun = true;
      done();
    })();
    expect(blockRun).toBeFalsy();
    runs(function() {
      expect(blockRun).toBeTruthy();
    });
  });

  it ("fails the spec when the callback is given an argument", function() {
    asyncSpec(function(done) {
      done("PASS: this is an expected failure message");
    })();
    runs(function() {
      expect(spec.results().failedCount).toEqual(1);
    });
  });

  it ("waits for done to be called", function() {
    var blockRun = false;
    asyncSpec(function(done) {
      setTimeout(function() {
        blockRun = true;
        done();
      }, 50);
    })();
    runs(function() {
      expect(blockRun).toBeTruthy();
    });
  });

  it ("times out", function() {
    asyncSpec(function(done) {
      setTimeout(function() {
        done("block didn't timeout as expected");
      }, 1000);
    }, {
      timeout: 500,
      message: "PASS: this is an expected failure message"
    })();
  });

});

