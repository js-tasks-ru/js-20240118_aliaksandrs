/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  if (param == 'desc') {
    return [...arr].sort((a, b) => new Intl.Collator(["ru", "eng"], { caseFirst: "upper"}).compare(b, a));
  }
  return [...arr].sort(new Intl.Collator(["ru", "eng"], { caseFirst: "upper"}).compare);
}
