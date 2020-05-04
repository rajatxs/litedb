
/**
 * Extract keys from localStorage
 * @param {string} pattern - String pattern
 */
export const getEntries = (pattern: string): Array<string> => {
  const keylist = Object.getOwnPropertyNames(localStorage) // All keys
  return keylist.filter(key => key.includes(pattern))
}