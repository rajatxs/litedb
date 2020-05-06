import LDBDocument from './document';
import { getEntries } from './utils';
class LDBCollection {
    /**
     * @constructor
     * @param {string} collname - Collection name
     */
    constructor(collname) {
        this.name = collname;
        this.metadata = {
            collid: `ldb:coll-${collname}`,
            collname
        };
    }
    /**
     * Refer to document
     * @param {string} docid - Document ID
     * @returns {LiteDBDocumentInstance}
     */
    doc(docid = String(Date.now())) {
        if (docid.includes('-')) {
            throw new Error("Use '_' character instead of hyphen");
        }
        return new LDBDocument(docid, {
            collid: this.metadata.collid,
            collname: this.metadata.collname
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
