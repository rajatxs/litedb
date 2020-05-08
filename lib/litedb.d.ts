import LDBCollection from './collection';
import { LiteDBKeyInstance, LiteDBCollectionOptions } from './interfaces';
/**
 * Core utility
 * @class
 * @version 1.0.0
 */
declare class LiteDB {
    /**
     * Reference of db collection
     * @static
     * @param {string} collname - Collection name
     * @param {LiteDBCollectionOptions} - Collection options
     * @returns {LDBCollection}
     */
    static collection(collname: string, collopt: LiteDBCollectionOptions): LDBCollection;
    /**
     * Collections entries
     * @public
     * @static
     * @returns {Array<string>}
     */
    static get entries(): Array<string>;
    /**
     * Inititate key instance
     * @param {string} id
     * @returns {LiteDBKeyInstance}
     */
    static key(id: string): LiteDBKeyInstance;
    /**
     * List of keys
     * @public
     * @static
     * @returns {Array<string>}
     */
    static get keys(): Array<string>;
    /**
     * Extracted part of keys
     * @public
     * @static
     * @returns {Array<string>}
     */
    static get keynames(): Array<string>;
    /**
     * Remove all keys from entry
     * @public
     * @static
     * @returns {Array<string>}
     */
    static removeAllKeys(): Array<string>;
    /**
     * Package version
     * @public
     * @static
     * @returns {string}
     */
    static get version(): string;
}
export default LiteDB;
