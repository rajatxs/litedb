/**
 * Extract keys from localStorage
 * @param {string} pattern - String pattern
 * @returns {Array<string>}
 */
export declare const getEntries: (pattern: string) => string[];
/**
 * Event handlers
 * @class
 * @extends {EventTarget}
 */
export declare abstract class EventEmitter extends EventTarget {
    /**
     * Dispatch an event
     * @param {string} evname - Event name
     * @param {EventInit} options - Event initial options
     * @returns {boolean}
     */
    emit(evname: string, options: EventInit): boolean;
    /**
     * Set event listener
     * @param {string} evname - Event name
     * @param {EventListenerOrEventListenerObject} handler Event handler callback
     * @param {boolean | AddEventListenerOptions} options - Event options
     * @returns {void}
     */
    on(evname: string, handler: EventListenerOrEventListenerObject, options: boolean | AddEventListenerOptions): void;
}
