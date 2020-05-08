import LDBDocument from './document';
import { getEntries } from './utils';
class LDBCollection {
    /**
     * @constructor
     * @param {string} collname - Collection name
     * @param {LiteDBCollectionOptions} - Collection options
     */
    constructor(collname, collopt = { unique: 'id' }) {
        this.collopt = collopt;
        this.name = collname;
        this.metadata = {
            collid: `ldb:coll-${collname}`,
            collname
        };
    }
    /**
     * Generate custom id depends on optional config
     * @returns {string}
     */
    generateDocumentID() {
        let genId = null;
        switch (this.collopt.unique) {
            case 'id':
                const genLogic = this.collopt.generate;
                if (genLogic && typeof genLogic === 'function') {
                    // Generate custom id
                    genId = genLogic.call({}, this);
                }
                else {
                    // Default timestamp
                    genId = String(Date.now());
                }
                break;
            case 'increment':
                const incId = this.count() + 1;
                genId = String(incId);
                break;
        }
        return genId;
    }
    /**
     * Refer to document
     * @param {string} docid - Document ID
     * @returns {LiteDBDocumentInstance}
     */
    doc(docid) {
        if (docid) {
            // External id
            // Convert numeric value
            docid = docid.toString();
        }
        else {
            // Manual id
            docid = this.generateDocumentID();
        }
        if (docid.includes('-')) {
            throw new Error("Use '_' character instead of hyphen");
        }
        const { collid, collname } = this.metadata;
        const { attachUniqueId } = this.collopt;
        return new LDBDocument(docid, {
            collid,
            collname,
            attachUniqueId
        });
    }
    /**
     * Remove all documents from collection
     * @returns {Array<string>}
     */
    removeAll() {
        return this.docs.map(doc => doc.remove());
    }
    /**
     * Instance of documents
     * @returns {Array<LiteDBDocumentInstance>}
     */
    get docs() {
        return this.docnames.map(docname => this.doc(docname));
    }
    /**
     * Skip documents
     * @param {range} range - Skip range
     * @returns {Array<LiteDBDocumentInstance>}
     */
    skip(range) {
        return this.docnames.slice(range).map(docname => this.doc(docname));
    }
    /**
     * Limitation of document array
     * @param {number} range - Document limit number
     * @returns {Array<LiteDBDocumentInstance>}
     */
    limit(range) {
        return this.docnames.slice(0, range).map(docname => this.doc(docname));
    }
    /**
     * Storage access keys related to collection
     * @type {Array<string>}
     */
    get entries() {
        return getEntries(this.metadata.collid);
    }
    /**
     * Document list
     * @type {Array<string>}
     */
    get docnames() {
        return this.entries.map(key => key.split(/\-/)[2]);
    }
    /**
     * Total number of documents
     * @returns {number}
     */
    count() {
        return this.entries.length;
    }
    /**
     * Alias for count method
     * @type {number}
     */
    get length() {
        return this.count();
    }
}
export default LDBCollection;
