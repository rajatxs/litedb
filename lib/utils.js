/**
 * Extract keys from localStorage
 * @param {string} pattern - String pattern
 * @returns {Array<string>}
 */
export const getEntries = (pattern) => {
    const keylist = Object.getOwnPropertyNames(localStorage); // All keys
    return keylist.filter(key => key.includes(pattern));
};
/**
 * Event handlers
 * @class
 * @extends {EventTarget}
 */
export class EventEmitter extends EventTarget {
    /**
     * Dispatch an event
     * @param {string} evname - Event name
     * @param {EventInit} options - Event initial options
     * @returns {boolean}
     */
    emit(evname, options) {
        return this.dispatchEvent(new Event(evname, options));
    }
    /**
     * Set event listener
     * @param {string} evname - Event name
     * @param {EventListenerOrEventListenerObject} handler Event handler callback
     * @param {boolean | AddEventListenerOptions} options - Event options
     * @returns {void}
     */
    on(evname, handler, options) {
        return this.addEventListener(evname, handler, options);
    }
}
