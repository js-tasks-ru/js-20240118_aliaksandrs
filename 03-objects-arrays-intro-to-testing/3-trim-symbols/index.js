/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (typeof size === 'undefined') {
    return string;
  }
  if (!size || !string) {
    return '';
  }
  let cont = 1;
  let symb = string[0];
  let result = string[0];
  for (let i = 0; i < string.length; i++) {
    if (symb == string[i] && cont < size) {
      result += string[i];
      cont++;
    } else if (symb != string[i]) {
      symb = string[i];
      result += string[i];
      cont = 1;
    }
  }
  return result;
}
