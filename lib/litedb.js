import LDBCollection from './collection';
import { getEntries } from './utils';
import LDBKey from './key';
/**
 * Core utility
 * @class
 * @version 1.0.0
 */
var LiteDB = /** @class */ (function () {
    function LiteDB() {
    }
    /**
     * Reference of db collection
     * @static
     * @param {string} collname - Collection name
     * @param {LiteDBCollectionOptions} - Collection options
     * @returns {LDBCollection}
     */
    LiteDB.collection = function (collname, collopt) {
        return new LDBCollection(collname, collopt);
    };
    Object.defineProperty(LiteDB, "entries", {
        /**
         * Collections entries
         * @public
         * @static
         * @returns {Array<string>}
         */
        get: function () {
            return getEntries('ldb:coll');
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Inititate key instance
     * @param {string} id
     * @returns {LiteDBKeyInstance}
     */
    LiteDB.key = function (id) {
        return new LDBKey(id);
    };
    Object.defineProperty(LiteDB, "keys", {
        /**
         * List of keys
         * @public
         * @static
         * @returns {Array<string>}
         */
        get: function () {
            return getEntries('ldb:key');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LiteDB, "keynames", {
        /**
         * Extracted part of keys
         * @public
         * @static
         * @returns {Array<string>}
         */
        get: function () {
            return this.keys.map(function (key) { return key.split(/\-/)[1]; });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Remove all keys from entry
     * @public
     * @static
     * @returns {Array<string>}
     */
    LiteDB.removeAllKeys = function () {
        var _this = this;
        return this.keynames.map(function (key) { return _this.key(key).remove(); });
    };
    Object.defineProperty(LiteDB, "version", {
        /**
         * Package version
         * @public
         * @static
         * @returns {string}
         */
        get: function () {
            return '1.0.0';
        },
        enumerable: false,
        configurable: true
    });
    return LiteDB;
}());
export default LiteDB;
