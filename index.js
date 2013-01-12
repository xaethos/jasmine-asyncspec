var generator = function(jasmine) {
  return function(block, options) {
    var spec = jasmine.getEnv().currentSpec;
    var blockRunning = true;
    var finish = function(error) {
      blockRunning = false
      if(error) spec.fail(error);
    };

    spec.runs(function() { block(finish); });
    spec.waitsFor(
      (function() { return !blockRunning; }),
      options != null ? options.message : void 0,
      options != null ? options.timeout : void 0
    );
  };
};

module.exports = generator;

