interface DiacriticsMap {
  [key: string]: string[]
}

// all diacritics
const diacritics: DiacriticsMap = {
  a: [
    'a',
    'à',
    'á',
    'â',
    'ã',
    'ä',
    'å',
    'æ',
    'ā',
    'ă',
    'ą',
    'ǎ',
    'ǟ',
    'ǡ',
    'ǻ',
    'ȁ',
    'ȃ',
    'ȧ',
    'ɐ',
    'ɑ',
    'ɒ',
    'ͣ',
    'а',
    'ӑ',
    'ӓ',
    'ᵃ',
    'ᵄ',
    'ᶏ',
    'ḁ',
    'ẚ',
    'ạ',
    'ả',
    'ấ',
    'ầ',
    'ẩ',
    'ẫ',
    'ậ',
    'ắ',
    'ằ',
    'ẳ',
    'ẵ',
    'ặ',
    'ₐ',
    'ⱥ',
    'ａ',
  ],
  A: [
    'A',
    'À',
    'Á',
    'Â',
    'Ã',
    'Ä',
    'Å',
    'Ā',
    'Ă',
    'Ą',
    'Ǎ',
    'Ǟ',
    'Ǡ',
    'Ǻ',
    'Ȁ',
    'Ȃ',
    'Ȧ',
    'Ⱥ',
    'А',
    'Ӑ',
    'Ӓ',
    'ᴀ',
    'ᴬ',
    'Ḁ',
    'Ạ',
    'Ả',
    'Ấ',
    'Ầ',
    'Ẩ',
    'Ẫ',
    'Ậ',
    'Ắ',
    'Ằ',
    'Ẳ',
    'Ẵ',
    'Ặ',
    'Ａ',
  ],

  b: ['b', 'ƀ', 'ƃ', 'ɓ', 'ᖯ', 'ᵇ', 'ᵬ', 'ᶀ', 'ḃ', 'ḅ', 'ḇ', 'ｂ'],
  B: ['B', 'Ɓ', 'Ƃ', 'Ƀ', 'ʙ', 'ᛒ', 'ᴃ', 'ᴮ', 'ᴯ', 'Ḃ', 'Ḅ', 'Ḇ', 'Ｂ'],

  c: ['c', 'ç', 'ć', 'ĉ', 'ċ', 'č', 'ƈ', 'ȼ', 'ɕ', 'ͨ', 'ᴄ', 'ᶜ', 'ḉ', 'ↄ', 'ｃ'],
  C: ['C', 'Ç', 'Ć', 'Ĉ', 'Ċ', 'Č', 'Ƈ', 'Ȼ', 'ʗ', 'Ḉ', 'Ｃ'],

  d: ['d', 'ď', 'đ', 'Ƌ', 'ƌ', 'ȡ', 'ɖ', 'ɗ', 'ͩ', 'ᵈ', 'ᵭ', 'ᶁ', 'ᶑ', 'ḋ', 'ḍ', 'ḏ', 'ḑ', 'ḓ', 'ｄ'],
  D: ['D', 'Ď', 'Đ', 'Ɖ', 'Ɗ', 'ᴰ', 'Ḋ', 'Ḍ', 'Ḏ', 'Ḑ', 'Ḓ', 'Ｄ'],

  e: [
    'e',
    'è',
    'é',
    'ê',
    'ë',
    'ē',
    'ĕ',
    'ė',
    'ę',
    'ě',
    'ǝ',
    'ȅ',
    'ȇ',
    'ȩ',
    'ɇ',
    'ɘ',
    'ͤ',
    'ᵉ',
    'ᶒ',
    'ḕ',
    'ḗ',
    'ḙ',
    'ḛ',
    'ḝ',
    'ẹ',
    'ẻ',
    'ẽ',
    'ế',
    'ề',
    'ể',
    'ễ',
    'ệ',
    'ₑ',
    'ｅ',
  ],
  E: [
    'E',
    'È',
    'É',
    'Ê',
    'Ë',
    'Ē',
    'Ĕ',
    'Ė',
    'Ę',
    'Ě',
    'Œ',
    'Ǝ',
    'Ɛ',
    'Ȅ',
    'Ȇ',
    'Ȩ',
    'Ɇ',
    'ɛ',
    'ɜ',
    'ɶ',
    'Є',
    'Э',
    'э',
    'є',
    'Ӭ',
    'ӭ',
    'ᴇ',
    'ᴈ',
    'ᴱ',
    'ᴲ',
    'ᵋ',
    'ᵌ',
    'ᶓ',
    'ᶔ',
    'ᶟ',
    'Ḕ',
    'Ḗ',
    'Ḙ',
    'Ḛ',
    'Ḝ',
    'Ẹ',
    'Ẻ',
    'Ẽ',
    'Ế',
    'Ề',
    'Ể',
    'Ễ',
    'Ệ',
    'Ｅ',
    '𐐁',
    '𐐩',
  ],

  f: ['f', 'ƒ', 'ᵮ', 'ᶂ', 'ᶠ', 'ḟ', 'ｆ'],
  F: ['F', 'Ƒ', 'Ḟ', 'ⅎ', 'Ｆ'],

  g: ['g', 'ĝ', 'ğ', 'ġ', 'ģ', 'ǥ', 'ǧ', 'ǵ', 'ɠ', 'ɡ', 'ᵍ', 'ᵷ', 'ᵹ', 'ᶃ', 'ᶢ', 'ḡ', 'ｇ'],
  G: ['G', 'Ĝ', 'Ğ', 'Ġ', 'Ģ', 'Ɠ', 'Ǥ', 'Ǧ', 'Ǵ', 'ɢ', 'ʛ', 'ᴳ', 'Ḡ', 'Ｇ'],

  h: [
    'h',
    'ĥ',
    'ħ',
    'ƕ',
    'ȟ',
    'ɥ',
    'ɦ',
    'ʮ',
    'ʯ',
    'ʰ',
    'ʱ',
    'ͪ',
    'Һ',
    'һ',
    'ᑋ',
    'ᶣ',
    'ḣ',
    'ḥ',
    'ḧ',
    'ḩ',
    'ḫ',
    'ⱨ',
    'ｈ',
  ],
  H: ['H', 'Ĥ', 'Ħ', 'Ȟ', 'ʜ', 'ᕼ', 'ᚺ', 'ᚻ', 'ᴴ', 'Ḣ', 'Ḥ', 'Ḧ', 'Ḩ', 'Ḫ', 'Ⱨ', 'Ｈ'],

  i: [
    'i',
    'ì',
    'í',
    'î',
    'ï',
    'ĩ',
    'ī',
    'ĭ',
    'į',
    'ǐ',
    'ȉ',
    'ȋ',
    'ɨ',
    'ͥ',
    'ᴉ',
    'ᵎ',
    'ᵢ',
    'ᶖ',
    'ᶤ',
    'ḭ',
    'ḯ',
    'ỉ',
    'ị',
    'ｉ',
  ],
  I: [
    'I',
    'Ì',
    'Í',
    'Î',
    'Ï',
    'Ĩ',
    'Ī',
    'Ĭ',
    'Į',
    'İ',
    'Ǐ',
    'Ȉ',
    'Ȋ',
    'ɪ',
    'І',
    'ᴵ',
    'ᵻ',
    'ᶦ',
    'ᶧ',
    'Ḭ',
    'Ḯ',
    'Ỉ',
    'Ị',
    'Ｉ',
  ],

  j: ['j', 'ĵ', 'ǰ', 'ɉ', 'ʝ', 'ʲ', 'ᶡ', 'ᶨ', 'ｊ'],
  J: ['J', 'Ĵ', 'ᴊ', 'ᴶ', 'Ｊ'],

  k: ['k', 'ķ', 'ƙ', 'ǩ', 'ʞ', 'ᵏ', 'ᶄ', 'ḱ', 'ḳ', 'ḵ', 'ⱪ', 'ｋ'],
  K: ['K', 'Ķ', 'Ƙ', 'Ǩ', 'ᴷ', 'Ḱ', 'Ḳ', 'Ḵ', 'Ⱪ', 'Ｋ'],

  l: ['l', 'ĺ', 'ļ', 'ľ', 'ŀ', 'ł', 'ƚ', 'ȴ', 'ɫ', 'ɬ', 'ɭ', 'ˡ', 'ᶅ', 'ᶩ', 'ᶪ', 'ḷ', 'ḹ', 'ḻ', 'ḽ', 'ℓ', 'ⱡ'],
  L: ['L', 'Ĺ', 'Ļ', 'Ľ', 'Ŀ', 'Ł', 'Ƚ', 'ʟ', 'ᴌ', 'ᴸ', 'ᶫ', 'Ḷ', 'Ḹ', 'Ḻ', 'Ḽ', 'Ⱡ', 'Ɫ'],

  m: ['m', 'ɯ', 'ɰ', 'ɱ', 'ͫ', 'ᴟ', 'ᵐ', 'ᵚ', 'ᵯ', 'ᶆ', 'ᶬ', 'ᶭ', 'ḿ', 'ṁ', 'ṃ', '㎡', '㎥', 'ｍ'],
  M: ['M', 'Ɯ', 'ᴍ', 'ᴹ', 'Ḿ', 'Ṁ', 'Ṃ', 'Ｍ'],

  n: ['n', 'ñ', 'ń', 'ņ', 'ň', 'ŉ', 'ƞ', 'ǹ', 'ȵ', 'ɲ', 'ɳ', 'ᵰ', 'ᶇ', 'ᶮ', 'ᶯ', 'ṅ', 'ṇ', 'ṉ', 'ṋ', 'ⁿ', 'ｎ'],
  N: ['N', 'Ñ', 'Ń', 'Ņ', 'Ň', 'Ɲ', 'Ǹ', 'Ƞ', 'ɴ', 'ᴎ', 'ᴺ', 'ᴻ', 'ᶰ', 'Ṅ', 'Ṇ', 'Ṉ', 'Ṋ', 'Ｎ'],

  o: [
    'o',
    'ò',
    'ó',
    'ô',
    'õ',
    'ö',
    'ø',
    'ō',
    'ŏ',
    'ő',
    'ơ',
    'ǒ',
    'ǫ',
    'ǭ',
    'ǿ',
    'ȍ',
    'ȏ',
    'ȫ',
    'ȭ',
    'ȯ',
    'ȱ',
    'ɵ',
    'ͦ',
    'о',
    'ӧ',
    'ө',
    'ᴏ',
    'ᴑ',
    'ᴓ',
    'ᴼ',
    'ᵒ',
    'ᶱ',
    'ṍ',
    'ṏ',
    'ṑ',
    'ṓ',
    'ọ',
    'ỏ',
    'ố',
    'ồ',
    'ổ',
    'ỗ',
    'ộ',
    'ớ',
    'ờ',
    'ở',
    'ỡ',
    'ợ',
    'ₒ',
    'ｏ',
    '𐐬',
  ],
  O: [
    'O',
    'Ò',
    'Ó',
    'Ô',
    'Õ',
    'Ö',
    'Ø',
    'Ō',
    'Ŏ',
    'Ő',
    'Ɵ',
    'Ơ',
    'Ǒ',
    'Ǫ',
    'Ǭ',
    'Ǿ',
    'Ȍ',
    'Ȏ',
    'Ȫ',
    'Ȭ',
    'Ȯ',
    'Ȱ',
    'О',
    'Ӧ',
    'Ө',
    'Ṍ',
    'Ṏ',
    'Ṑ',
    'Ṓ',
    'Ọ',
    'Ỏ',
    'Ố',
    'Ồ',
    'Ổ',
    'Ỗ',
    'Ộ',
    'Ớ',
    'Ờ',
    'Ở',
    'Ỡ',
    'Ợ',
    'Ｏ',
    '𐐄',
  ],

  p: ['p', 'ᵖ', 'ᵱ', 'ᵽ', 'ᶈ', 'ṕ', 'ṗ', 'ｐ'],
  P: ['P', 'Ƥ', 'ᴘ', 'ᴾ', 'Ṕ', 'Ṗ', 'Ᵽ', 'Ｐ'],

  q: ['q', 'ɋ', 'ʠ', 'ᛩ', 'ｑ'],
  Q: ['Q', 'Ɋ', 'Ｑ'],

  r: ['r', 'ŕ', 'ŗ', 'ř', 'ȑ', 'ȓ', 'ɍ', 'ɹ', 'ɻ', 'ʳ', 'ʴ', 'ʵ', 'ͬ', 'ᵣ', 'ᵲ', 'ᶉ', 'ṙ', 'ṛ', 'ṝ', 'ṟ'],
  R: ['R', 'Ŕ', 'Ŗ', 'Ř', 'Ʀ', 'Ȑ', 'Ȓ', 'Ɍ', 'ʀ', 'ʁ', 'ʶ', 'ᚱ', 'ᴙ', 'ᴚ', 'ᴿ', 'Ṙ', 'Ṛ', 'Ṝ', 'Ṟ', 'Ɽ'],

  s: ['s', 'ś', 'ŝ', 'ş', 'š', 'ș', 'ʂ', 'ᔆ', 'ᶊ', 'ṡ', 'ṣ', 'ṥ', 'ṧ', 'ṩ', 'ｓ'],
  S: ['S', 'Ś', 'Ŝ', 'Ş', 'Š', 'Ș', 'ȿ', 'ˢ', 'ᵴ', 'Ṡ', 'Ṣ', 'Ṥ', 'Ṧ', 'Ṩ', 'Ｓ'],

  t: ['t', 'ţ', 'ť', 'ŧ', 'ƫ', 'ƭ', 'ț', 'ʇ', 'ͭ', 'ᵀ', 'ᵗ', 'ᵵ', 'ᶵ', 'ṫ', 'ṭ', 'ṯ', 'ṱ', 'ẗ', 'ｔ'],
  T: ['T', 'Ţ', 'Ť', 'Ƭ', 'Ʈ', 'Ț', 'Ⱦ', 'ᴛ', 'ᵀ', 'Ṫ', 'Ṭ', 'Ṯ', 'Ṱ', 'Ｔ'],

  u: [
    'u',
    'ù',
    'ú',
    'û',
    'ü',
    'ũ',
    'ū',
    'ŭ',
    'ů',
    'ű',
    'ų',
    'ư',
    'ǔ',
    'ǖ',
    'ǘ',
    'ǚ',
    'ǜ',
    'ȕ',
    'ȗ',
    'ͧ',
    'ߎ',
    'ᵘ',
    'ᵤ',
    'ṳ',
    'ṵ',
    'ṷ',
    'ṹ',
    'ṻ',
    'ụ',
    'ủ',
    'ứ',
    'ừ',
    'ử',
    'ữ',
    'ự',
    'ｕ',
  ],
  U: [
    'U',
    'Ù',
    'Ú',
    'Û',
    'Ü',
    'Ũ',
    'Ū',
    'Ŭ',
    'Ů',
    'Ű',
    'Ų',
    'Ư',
    'Ǔ',
    'Ǖ',
    'Ǘ',
    'Ǚ',
    'Ǜ',
    'Ȕ',
    'Ȗ',
    'Ʉ',
    'ᴜ',
    'ᵁ',
    'ᵾ',
    'Ṳ',
    'Ṵ',
    'Ṷ',
    'Ṹ',
    'Ṻ',
    'Ụ',
    'Ủ',
    'Ứ',
    'Ừ',
    'Ử',
    'Ữ',
    'Ự',
    'Ｕ',
  ],

  v: ['v', 'ʋ', 'ͮ', 'ᵛ', 'ᵥ', 'ᶹ', 'ṽ', 'ṿ', 'ⱱ', 'ｖ', 'ⱴ'],
  V: ['V', 'Ʋ', 'Ʌ', 'ʌ', 'ᴠ', 'ᶌ', 'Ṽ', 'Ṿ', 'Ｖ'],

  w: ['w', 'ŵ', 'ʷ', 'ᵂ', 'ẁ', 'ẃ', 'ẅ', 'ẇ', 'ẉ', 'ẘ', 'ⱳ', 'ｗ'],
  W: ['W', 'Ŵ', 'ʍ', 'ᴡ', 'Ẁ', 'Ẃ', 'Ẅ', 'Ẇ', 'Ẉ', 'Ⱳ', 'Ｗ'],

  x: ['x', '̽', '͓', 'ᶍ', 'ͯ', 'ẋ', 'ẍ', 'ₓ', 'ｘ'],
  X: ['X', 'ˣ', 'ͯ', 'Ẋ', 'Ẍ', '☒', '✕', '✖', '✗', '✘', 'Ｘ'],

  y: ['y', 'ý', 'ÿ', 'ŷ', 'ȳ', 'ɏ', 'ʸ', 'ẏ', 'ỳ', 'ỵ', 'ỷ', 'ỹ', 'ｙ'],
  Y: ['Y', 'Ý', 'Ŷ', 'Ÿ', 'Ƴ', 'ƴ', 'Ȳ', 'Ɏ', 'ʎ', 'ʏ', 'Ẏ', 'Ỳ', 'Ỵ', 'Ỷ', 'Ỹ', 'Ｙ'],

  z: ['z', 'ź', 'ż', 'ž', 'ƶ', 'ȥ', 'ɀ', 'ʐ', 'ʑ', 'ᙆ', 'ᙇ', 'ᶻ', 'ᶼ', 'ᶽ', 'ẑ', 'ẓ', 'ẕ', 'ⱬ', 'ｚ'],
  Z: ['Z', 'Ź', 'Ż', 'Ž', 'Ƶ', 'Ȥ', 'ᴢ', 'ᵶ', 'Ẑ', 'Ẓ', 'Ẕ', 'Ⱬ', 'Ｚ'],
}

/*
 * Main function of the module which removes all diacritics from the received text
 */

export default function removeDiacritics(text: string): string {
  const result: string[] = []

  for (let i = 0; i < text.length; i += 1) {
    const searchChar = text.charAt(i)
    let foundChar = false

    for (const key in diacritics) {
      const index = diacritics[key]?.indexOf(searchChar)
      if (index !== -1) {
        result.push(key)
        foundChar = true
        break
      }
    }

    if (!foundChar) {
      result.push(searchChar)
    }
  }

  return result.join('')
}
