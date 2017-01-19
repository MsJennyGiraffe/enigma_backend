module.exports = (message,rotations,cryptType) => {

  function range(start,stop) {
    var result=[];
    for (var idx=start.charCodeAt(0),end=stop.charCodeAt(0); idx <=end; ++idx){
      result.push(String.fromCharCode(idx));
    }
    return result;
  };

  const CHAR_MAP = range('a','z');

  let rotationIndex = 0;
  let encryptedMessage = [];

  function encryptRotatedIndex(index,rotation) {
    return (index + rotation) % CHAR_MAP.length;
  }

  function decryptRotatedIndex(index,rotation) {
    return (index - rotation) % CHAR_MAP.length;
  }

  function rotateCharacter(character, rotation) {
    let index = CHAR_MAP.indexOf(character);
    let rotatedIndex;
    if (cryptType === "encrypt") {
      rotatedIndex = encryptRotatedIndex(index,rotation);
    } else if (cryptType === "decrypt") {
      rotatedIndex = decryptRotatedIndex(index,rotation);
    }
    rotationIndex++;
    encryptedMessage.push(CHAR_MAP[rotatedIndex]);
  }

  function rotateMessage() {
    let messageChars = message.split('');
    for(let i = 0;i < messageChars.length; i++) {
      rotationIndex === 4 ? rotationIndex = 0 : null;
      if (CHAR_MAP.includes(messageChars[i])) {
        rotateCharacter(messageChars[i], rotations[rotationIndex])
      } else {
        encryptedMessage.push(messageChars[i])
      }
    }
  }

  rotateMessage()
  return encryptedMessage.join('');
};
