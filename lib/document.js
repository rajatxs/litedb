import LDBio from './io';
class LDBDocument extends LDBio {
    /**
     * Inititate document
     * @param {string} docid - Document ID
     * @param {LDBCollectionMetadata} coll - Collection metadata
     */
    constructor(docid, coll) {
        super();
        this.name = docid;
        this.metadata = Object.assign(Object.assign({}, coll), { docid, dockey: `${coll.collid}-${docid}` // Combine key
         });
    }
    /**
     * Existence of document in storage
     * @type {boolean}
     */
    get exists() {
        return localStorage.getItem(this.metadata.dockey) ? true : false;
    }
    /**
     * Document keys
     * @type {Array<string>}
     */
    get keys() {
        return Object.keys(this.get() || {});
    }
    /**
     * Get document object
     * @returns {object}
     */
    get() {
        return this.read(this.metadata.dockey) || null;
    }
    /**
     * Add or update document
     * @param {object} payload - Document payload
     * @returns {string}
     */
    set(payload) {
        const { attachUniqueId, docid } = this.metadata;
        if (attachUniqueId) {
            // Assign unique id
            Reflect.set(payload, attachUniqueId, docid);
        }
        return this.write(this.metadata.dockey, payload);
    }
    /**
     * Remove the document
     * @returns {string}
     */
    remove() {
        this.delete(this.metadata.dockey);
        return this.metadata.dockey;
    }
    /**
     * Merge new payload
     * @param {object} mixpayload - Payload
     * @returns {string}
     */
    merge(mixpayload) {
        return this.set(Object.assign(this.get(), mixpayload));
    }
    /**
     * Stringify object payload
     * @override
     * @returns {string}
     */
    toString() {
        return JSON.stringify(this.get());
    }
    /**
     * Alias for get() method
     * @override
     * @returns {object}
     */
    valueOf() {
        return this.get();
    }
}
export default LDBDocument;
