function range(start,stop) {
  var result=[];
  for (var idx=start.charCodeAt(0),end=stop.charCodeAt(0); idx <=end; ++idx){
    result.push(String.fromCharCode(idx));
  }
  return result;
};

const CHAR_MAP = range('a','z');

module.exports = (messageToEncrypt,rotations) => {

  let rotationIndex = 0;
  let encryptedMessage = [];

  function encryptCharacter(character, rotation) {
    let index = CHAR_MAP.indexOf(character)
    let rotatedIndex = (index + rotation) % CHAR_MAP.length;
    rotationIndex++;
    encryptedMessage.push(CHAR_MAP[rotatedIndex]);
  }

  function encryptMessage() {
    let messageChars = messageToEncrypt.split('');
    for(let i = 0;i < messageChars.length; i++) {
      rotationIndex === 4 ? rotationIndex = 0 : null;
      if (CHAR_MAP.includes(character)) {
        encryptCharacter(character, rotations[rotationIndex])
      } else {
        encryptedMessage.push(character)
      }
    }
  }

  encryptedMessage()
  return encryptedMessage.join();
};
