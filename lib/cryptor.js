const range = require('./range')

class Cryptor {
  constructor(options) {
    this.rotations = options.rotations;
    this.cryptType = options.cryptType;
    this.rotationIndex = 0;
    this.encryptedMessage = [];
    this.charMap = range("a", "z");
  }

  encryptedIndex(index,rotation) {
    return (index + rotation) % (this.charMap.length);
  }

  decryptedIndex(index,rotation) {
    let offset = (index - rotation) % (this.charMap.length);
    if ( Math.abs(offset) === offset) {
      return offset;
    }
    return (this.charMap.length) + offset;
  }

  rotateCharacter(character, rotation) {
    let index = this.charMap.indexOf(character);
    let charIndex;
    if (this.cryptType === "encrypt") {
      charIndex = this.encryptedIndex(index,rotation);
    } else if (this.cryptType === "decrypt") {
      charIndex = this.decryptedIndex(index,rotation);
    }
    this.rotationIndex += 1;
    this.encryptedMessage.push(this.charMap[charIndex]);
    return this.charMap[charIndex];
  }
  rotateMessage(message) {
    let messageChars = message.split('');
    for(let i = 0;i < messageChars.length; i++) {
      this.rotationIndex === 4 ? this.rotationIndex = 0 : null;
      if (this.charMap.join("").includes(messageChars[i])) {
        this.rotateCharacter(messageChars[i], this.rotations[this.rotationIndex])
      } else {
        this.encryptedMessage.push(messageChars[i])
      }
    }
    return this.encryptedMessage.join("")
  }
}

module.exports = Cryptor;

// module.exports = (message,rotations,cryptType) => {
//
//
//
//
//   rotateMessage()
//   return encryptedMessage.join('');
// };
