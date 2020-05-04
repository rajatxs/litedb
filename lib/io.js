export default class LDBio {
    /**
     * Read object from localStorage
     * @public
     * @param {string} key - Document access key
     * @returns {object}
     */
    read(key) {
        return JSON.parse(localStorage.getItem(key));
    }
    /**
     * Write object value into localStorage
     * @public
     * @param {string} key - Document ID
     * @param {object} payload - Object value
     * @returns {string}
     */
    write(key, payload) {
        localStorage.setItem(key, JSON.stringify(payload));
        return key;
    }
    /**
     * Remove the document
     * @param {string} key - Document ID
     * @returns {string}
     */
    delete(key) {
        localStorage.removeItem(key);
        return key;
    }
}
