export default class LDBio {
    /**
     * Read object from localStorage
     * @public
     * @param {string} key - Document access key
     * @returns {object}
     */
    read(key: string): object;
    /**
     * Write object value into localStorage
     * @public
     * @param {string} key - Document ID
     * @param {object} payload - Object value
     * @returns {string}
     */
    write(key: string, payload: object): string;
    /**
     * Remove the document
     * @param {string} key - Document ID
     * @returns {string}
     */
    delete(key: string): string;
}
