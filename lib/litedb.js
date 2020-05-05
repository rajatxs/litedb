import LDBCollection from './collection';
import { getEntries } from './utils';
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
