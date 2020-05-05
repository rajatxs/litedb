import LDBCollection from './collection'
import { getEntries } from './utils'

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
  public static collection(collname: string) {
    return new LDBCollection(collname)
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