import LDBio from './io';
class LDBDocument extends LDBio {
    /**
     * Inititate document
     * @param {string} docid - Document ID
     * @param {LDBCollectionMetadata} coll - Collection metadata
     */
    constructor(docid, coll) {
        super();
        const { collid, collname } = coll;
        this.metadata = {
            collid,
            collname,
            docid,
            dockey: `${collid}-${docid}` // Combine key
        };
    }
    /**
     * Existence of document in storage
     * @type {boolean}
     */
    get exists() {
        return localStorage.getItem(this.metadata.dockey) ? true : false;
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
}
export default LDBDocument;
