class Cryptor {
  const CHAR_MAP = range('a','z');
  constructor(message, rotations, cryptType) {
    this.message = message;
    this.rotations = rotations;
    this.cryptType = cryptType;
    this.rotationIndex = 0;
    this.encryptedMessage = [];
  }
  range(start,stop) {
    var result=[];
    for (var idx=start.charCodeAt(0),end=stop.charCodeAt(0); idx <=end; ++idx){
      result.push(String.fromCharCode(idx));
    }
    return result;
  };

  //   function encryptRotatedIndex(index,rotation) {
  //     return (index + rotation) % (CHAR_MAP.length -1);
  //   }
  //
  //   function decryptRotatedIndex(index,rotation) {
  //     let offset = (index - rotation) % (CHAR_MAP.length -1);
  //     if ( Math.abs(offset) === offset) {
  //       return offset;
  //     }
  //     return (CHAR_MAP.length - 1) + offset;
  //   }
}


module.exports = Cryptor;

// module.exports = (message,rotations,cryptType) => {
//
//
//   function rotateCharacter(character, rotation) {
//     let index = CHAR_MAP.indexOf(character);
//     let charIndex;
//     if (cryptType === "encrypt") {
//       charIndex = encryptRotatedIndex(index,rotation);
//     } else if (cryptType === "decrypt") {
//       charIndex = decryptRotatedIndex(index,rotation);
//     }
//     rotationIndex += 1;
//     encryptedMessage.push(CHAR_MAP[charIndex]);
//   }
//
//   function rotateMessage() {
//     let messageChars = message.split('');
//     for(let i = 0;i < messageChars.length; i++) {
//       rotationIndex === 4 ? rotationIndex = 0 : null;
//       if (CHAR_MAP.includes(messageChars[i])) {
//         rotateCharacter(messageChars[i], rotations[rotationIndex])
//       } else {
//         encryptedMessage.push(messageChars[i])
//       }
//     }
//   }
//
//   rotateMessage()
//   return encryptedMessage.join('');
// };
