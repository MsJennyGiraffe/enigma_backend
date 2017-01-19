
module.exports = () => {
  return "Hello World";
};
//
//
// class Encryptor
//   attr_reader :rotation_index, :saved
//   include StorageForComponents
//
//   def initialize
//     @rotation_index = 0
//     @saved = []
//   end
//
//   def encrypt_character(character, rotation)
//     index = CHAR_MAP.index(character)
//     rotated_index = (index + rotation) % 39
//     @rotation_index += 1
//     saved << CHAR_MAP[rotated_index]
//   end
//
//   def encrypt_message(message_to_encrypt, rotation)
//     message_to_encrypt.chars.map do |character|
//       rotation_index == 4 ? @rotation_index = 0 : nil
//       if CHAR_MAP.include?(character)
//         encrypt_character(character, rotation[rotation_index])
//       else
//         saved << character
//       end
//     end
//     saved.join
//   end
// end
