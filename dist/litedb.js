var LiteDB = (function () {
    'use strict';

    class LDBio {
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

    /**
     * Extract keys from localStorage
     * @param {string} pattern - String pattern
     * @returns {Array<string>}
     */
    const getEntries = (pattern) => {
        const keylist = Object.getOwnPropertyNames(localStorage); // All keys
        return keylist.filter(key => key.includes(pattern));
    };

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

    /**
     * Core utility
     * @class
     * @version 1.0.0
     */
    class LiteDB {
        /**
         * Reference of db collection
         * @static
         * @param {string} collname - Collection name
         * @param {LiteDBCollectionOptions} - Collection options
         * @returns {LDBCollection}
         */
        static collection(collname, collopt) {
            return new LDBCollection(collname, collopt);
        }
        /**
         * Collections entries
         * @public
         * @static
         * @returns {Array<string>}
         */
        static get entries() {
            return getEntries('ldb:coll');
        }
        /**
         * Inititate key instance
         * @param {string} id
         * @returns {LiteDBKeyInstance}
         */
        static key(id) {
            return new LDBKey(id);
        }
        /**
         * List of keys
         * @public
         * @static
         * @returns {Array<string>}
         */
        static get keys() {
            return getEntries('ldb:key');
        }
        /**
         * Extracted part of keys
         * @public
         * @static
         * @returns {Array<string>}
         */
        static get keynames() {
            return this.keys.map(key => key.split(/\-/)[1]);
        }
        /**
         * Remove all keys from entry
         * @public
         * @static
         * @returns {Array<string>}
         */
        static removeAllKeys() {
            return this.keynames.map(key => this.key(key).remove());
        }
        /**
         * Package version
         * @public
         * @static
         * @returns {string}
         */
        static get version() {
            return '1.0.0';
        }
    }

    return LiteDB;

}());
