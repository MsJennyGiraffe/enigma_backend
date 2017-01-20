const assert = require('assert');
const Cryptor = require('../lib/cryptor')

describe('Encrypt', function() {
  describe('#range()', function() {
    it('should return an array of a character within a range', function() {
      var cryptor = new Cryptor();
      assert.deepEqual(["A"], cryptor.range("A", "A"));
    });

    it('should return an array of characters within a range', function() {
      var cryptor = new Cryptor();
      assert.deepEqual([ 'a', 'b', 'c', 'd', 'e' ], cryptor.range("a", "e"))
    });
  });
});
