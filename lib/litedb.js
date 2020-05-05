import LDBCollection from './collection';
import { getEntries } from './utils';
import LDBKey from './key';
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
     */
    static collection(collname) {
        return new LDBCollection(collname);
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
export default LiteDB;
