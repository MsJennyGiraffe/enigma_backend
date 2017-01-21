const assert = require('assert');
const range = require('../lib/range')

describe("#range()", function() {
  it("should return an array of a character within a range", function() {
    assert.deepEqual(["A"], range("A", "A"));
  });

  it("should return an array of characters within a range", function() {
    assert.deepEqual([ "a", "b", "c", "d", "e" ], range("a", "e"))
  });
});
