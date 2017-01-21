const assert = require('assert');
const Cryptor = require('../lib/cryptor')

describe("Cryptor", function() {

  describe("#encryptedIndex()", function() {
    it("should return the encrypted character's new index", function() {
      var cryptor = new Cryptor({rotations: [1, 2, 3, 4], cryptType: "encrypt"});
      assert.equal(2, cryptor.encryptedIndex(1, 1));
    });

    it("should return the encrypted character's new index for larger numbers", function() {
      var cryptor = new Cryptor({rotations: [1, 2, 3, 4], cryptType: "encrypt"});
      assert.equal(23, cryptor.encryptedIndex(1, 100));
    });
  });

  describe("#decryptedIndex()", function() {
    it("should return the decrypted character's new index", function() {
      var cryptor = new Cryptor({rotations: [1, 2, 3, 4], cryptType: "encrypt"});
      assert.equal(1, cryptor.decryptedIndex(2, 1));
    });

    it("should return the decrypted character's new index for larger numbers", function() {
      var cryptor = new Cryptor({rotations: [1, 2, 3, 4], cryptType: "encrypt"});
      assert.equal(1, cryptor.decryptedIndex(23, 100));
    });
  });

  describe("#rotateCharacter()", function() {
    it("should return the encrypted character", function() {
      var cryptor = new Cryptor({rotations: [1, 2, 3, 4], cryptType: "encrypt"});
      assert.equal("b", cryptor.rotateCharacter("a", 1));
    });

    it("should return the decrypted character", function() {
      var cryptor = new Cryptor({rotations: [1, 2, 3, 4], cryptType: "decrypt"});
      assert.equal("z", cryptor.rotateCharacter("a", 1));
    });
  });

  describe("#rotateMessage()", function() {
    it("should return the encrypted message", function() {
      var cryptor = new Cryptor({rotations: [1, 2, 3, 4], cryptType: "encrypt"});
      assert.equal("igopp", cryptor.rotateMessage("hello"));
    });

    it("should return the decrypted message", function() {
      var cryptor = new Cryptor({rotations: [1, 2, 3, 4], cryptType: "decrypt"});
      assert.equal("hello", cryptor.rotateMessage("igopp"));
    });
  });
});
