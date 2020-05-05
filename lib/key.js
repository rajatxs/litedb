class LDBKey {
    /**
     * @public
     * @constructor
     * @param {string} keyname - Reference key
     */
    constructor(keyname) {
        this.keyname = keyname;
    }
    /**
     * LiteDB key
     * @type {string}
     */
    get key() {
        return `ldb:key-${this.keyname}`;
    }
    /**
     * Value of reference key
     * @type {string}
     */
    get val() {
        return localStorage.getItem(this.key) || null;
    }
    /**
     * Existence of key
     * @type {boolean}
     */
    get has() {
        return this.val ? true : false;
    }
    /**
     * Set new value
     * @param {string} val - New value
     */
    set val(val) {
        localStorage.setItem(this.key, val.toString());
    }
    /**
     * Remove key from localStorage
     * @returns {string}
     */
    remove() {
        localStorage.removeItem(this.key);
        return this.keyname;
    }
}
export default LDBKey;
