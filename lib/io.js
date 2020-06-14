var LDBio = /** @class */ (function () {
    function LDBio() {
    }
    /**
     * Read object from localStorage
     * @public
     * @param {string} key - Document access key
     * @returns {object}
     */
    LDBio.prototype.read = function (key) {
        return JSON.parse(localStorage.getItem(key));
    };
    /**
     * Write object value into localStorage
     * @public
     * @param {string} key - Document ID
     * @param {object} payload - Object value
     * @returns {string}
     */
    LDBio.prototype.write = function (key, payload) {
        localStorage.setItem(key, JSON.stringify(payload));
        return key;
    };
    /**
     * Remove the document
     * @param {string} key - Document ID
     * @returns {string}
     */
    LDBio.prototype.delete = function (key) {
        localStorage.removeItem(key);
        return key;
    };
    return LDBio;
}());
export default LDBio;
