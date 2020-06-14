var LDBKey = /** @class */ (function () {
    /**
     * @public
     * @constructor
     * @param {string} keyname - Reference key
     */
    function LDBKey(keyname) {
        this.keyname = keyname;
    }
    Object.defineProperty(LDBKey.prototype, "key", {
        /**
         * LiteDB key
         * @type {string}
         */
        get: function () {
            return "ldb:key-" + this.keyname;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LDBKey.prototype, "val", {
        /**
         * Value of reference key
         * @type {string}
         */
        get: function () {
            return localStorage.getItem(this.key) || null;
        },
        /**
         * Set new value
         * @param {string} val - New value
         */
        set: function (val) {
            localStorage.setItem(this.key, val.toString());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LDBKey.prototype, "has", {
        /**
         * Existence of key
         * @type {boolean}
         */
        get: function () {
            return this.val ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Remove key from localStorage
     * @returns {string}
     */
    LDBKey.prototype.remove = function () {
        localStorage.removeItem(this.key);
        return this.keyname;
    };
    return LDBKey;
}());
export default LDBKey;
