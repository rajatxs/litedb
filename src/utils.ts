
/**
 * Extract keys from localStorage
 * @param {string} pattern - String pattern
 * @returns {Array<string>}
 */
export const getEntries = (pattern: string): Array<string> => {
  const keylist = Object.getOwnPropertyNames(localStorage) // All keys
  return keylist.filter(key => key.includes(pattern))
}

/**
 * Event handlers
 * @class
 * @extends {EventTarget}
 */
export abstract class EventEmitter extends EventTarget {
  /**
   * Dispatch an event
   * @param {string} evname - Event name
   * @param {EventInit} options - Event initial options
   * @returns {boolean}
   */
  public emit(evname: string, options: EventInit): boolean {
    return this.dispatchEvent(new Event(evname, options))
  }

  /**
   * Set event listener
   * @param {string} evname - Event name
   * @param {EventListenerOrEventListenerObject} handler Event handler callback
   * @param {boolean | AddEventListenerOptions} options - Event options
   * @returns {void}
   */
  public on(evname: string, handler: EventListenerOrEventListenerObject, options: boolean | AddEventListenerOptions): void {
    return this.addEventListener(evname, handler, options)
  }
}