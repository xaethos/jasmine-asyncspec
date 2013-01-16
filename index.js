module.exports = function(jasmine) {

  function asyncBlock(block, options) {
    var spec = jasmine.getEnv().currentSpec;
    var blockRunning = true;
    var finish = function(error) {
      blockRunning = false;
      if(error) spec.fail(error);
    };

    spec.runs(function() { block(finish); });
    spec.waitsFor(
      (function() { return !blockRunning; }),
      options.message,
      options.timeout
    );
  }

  return function(spec, options) {
    options = options != null ? options : {};

    return function() {
      asyncBlock(spec, {
        message: options.message || "spec to finish running",
        timeout: options.timeout
      });
    }
  }

};

