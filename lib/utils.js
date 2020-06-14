var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Extract keys from localStorage
 * @param {string} pattern - String pattern
 * @returns {Array<string>}
 */
export var getEntries = function (pattern) {
    var keylist = Object.getOwnPropertyNames(localStorage); // All keys
    return keylist.filter(function (key) { return key.includes(pattern); });
};
/**
 * Event handlers
 * @class
 * @extends {EventTarget}
 */
var EventEmitter = /** @class */ (function (_super) {
    __extends(EventEmitter, _super);
    function EventEmitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Dispatch an event
     * @param {string} evname - Event name
     * @param {EventInit} options - Event initial options
     * @returns {boolean}
     */
    EventEmitter.prototype.emit = function (evname, options) {
        return this.dispatchEvent(new Event(evname, options));
    };
    /**
     * Set event listener
     * @param {string} evname - Event name
     * @param {EventListenerOrEventListenerObject} handler Event handler callback
     * @param {boolean | AddEventListenerOptions} options - Event options
     * @returns {void}
     */
    EventEmitter.prototype.on = function (evname, handler, options) {
        return this.addEventListener(evname, handler, options);
    };
    return EventEmitter;
}(EventTarget));
export { EventEmitter };
