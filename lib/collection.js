import LDBDocument from './document';
import { getEntries } from './utils';
var LDBCollection = /** @class */ (function () {
    /**
     * @constructor
     * @param {string} collname - Collection name
     * @param {LiteDBCollectionOptions} - Collection options
     */
    function LDBCollection(collname, collopt) {
        if (collopt === void 0) { collopt = { unique: 'id' }; }
        this.collopt = collopt;
        this.name = collname;
        this.metadata = {
            collid: "ldb:coll-" + collname,
            collname: collname
        };
    }
    /**
     * Generate custom id depends on optional config
     * @returns {string}
     */
    LDBCollection.prototype.generateDocumentID = function () {
        var genId = null;
        switch (this.collopt.unique) {
            case 'id':
                var genLogic = this.collopt.generate;
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
                var incId = this.count() + 1;
                genId = String(incId);
                break;
        }
        return genId;
    };
    /**
     * Refer to document
     * @param {string} docid - Document ID
     * @returns {LiteDBDocumentInstance}
     */
    LDBCollection.prototype.doc = function (docid) {
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
        var _a = this.metadata, collid = _a.collid, collname = _a.collname;
        var attachUniqueId = this.collopt.attachUniqueId;
        return new LDBDocument(docid, {
            collid: collid,
            collname: collname,
            attachUniqueId: attachUniqueId
        });
    };
    /**
     * Remove all documents from collection
     * @returns {Array<string>}
     */
    LDBCollection.prototype.removeAll = function () {
        return this.docs.map(function (doc) { return doc.remove(); });
    };
    Object.defineProperty(LDBCollection.prototype, "docs", {
        /**
         * Instance of documents
         * @returns {Array<LiteDBDocumentInstance>}
         */
        get: function () {
            var _this = this;
            return this.docnames.map(function (docname) { return _this.doc(docname); });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Skip documents
     * @param {range} range - Skip range
     * @returns {Array<LiteDBDocumentInstance>}
     */
    LDBCollection.prototype.skip = function (range) {
        var _this = this;
        return this.docnames.slice(range).map(function (docname) { return _this.doc(docname); });
    };
    /**
     * Limitation of document array
     * @param {number} range - Document limit number
     * @returns {Array<LiteDBDocumentInstance>}
     */
    LDBCollection.prototype.limit = function (range) {
        var _this = this;
        return this.docnames.slice(0, range).map(function (docname) { return _this.doc(docname); });
    };
    Object.defineProperty(LDBCollection.prototype, "entries", {
        /**
         * Storage access keys related to collection
         * @type {Array<string>}
         */
        get: function () {
            return getEntries(this.metadata.collid);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LDBCollection.prototype, "docnames", {
        /**
         * Document list
         * @type {Array<string>}
         */
        get: function () {
            return this.entries.map(function (key) { return key.split(/\-/)[2]; });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Total number of documents
     * @returns {number}
     */
    LDBCollection.prototype.count = function () {
        return this.entries.length;
    };
    Object.defineProperty(LDBCollection.prototype, "length", {
        /**
         * Alias for count method
         * @type {number}
         */
        get: function () {
            return this.count();
        },
        enumerable: false,
        configurable: true
    });
    return LDBCollection;
}());
export default LDBCollection;
