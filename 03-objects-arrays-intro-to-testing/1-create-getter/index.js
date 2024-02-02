/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const keys = path.split('.');
  return (obj) => {
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] in obj && i == keys.length - 1) {
        return obj[keys[i]];
      } else if (keys[i] in obj) {
        obj = obj[keys[i]];
      } else {
        return;
      }
    }
  };
}
