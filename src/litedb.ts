import LDBCollection from './collection'
import { getEntries } from './utils'
import LDBKey from './key'
import { LiteDBKeyInstance, LiteDBCollectionOptions } from './interfaces'

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
  public static collection(collname: string, collopt: LiteDBCollectionOptions) {
    return new LDBCollection(collname, collopt)
  }

  /**
   * Collections entries
   * @public
   * @static
   * @returns {Array<string>}
   */
  public static get entries(): Array<string> {
    return getEntries('ldb:coll')
  }

  /**
   * Inititate key instance
   * @param {string} id
   * @returns {LiteDBKeyInstance}
   */
  public static key(id: string) : LiteDBKeyInstance {
    return new LDBKey(id)
  }

  /**
   * List of keys
   * @public
   * @static
   * @returns {Array<string>}
   */
  public static get keys(): Array<string> {
    return getEntries('ldb:key')
  }

  /**
   * Extracted part of keys
   * @public
   * @static
   * @returns {Array<string>}
   */
  public static get keynames(): Array<string> {
    return this.keys.map(key => key.split(/\-/)[1])
  }

  /**
   * Remove all keys from entry
   * @public
   * @static
   * @returns {Array<string>}
   */
  public static removeAllKeys(): Array<string> {
    return this.keynames.map(key => this.key(key).remove())
  }

  /**
   * Package version
   * @public
   * @static
   * @returns {string}
   */
  public static get version(): string {
    return '1.0.0'
  }
}

export default LiteDB