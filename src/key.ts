import { LiteDBKeyInstance } from './interfaces'

class LDBKey implements LiteDBKeyInstance {
  /**
   * @public
   * @constructor
   * @param {string} keyname - Reference key
   */
  public constructor(public keyname: string) {}

  /**
   * LiteDB key
   * @type {string}
   */
  get key(): string {
    return `ldb:key-${this.keyname}`
  }

  /**
   * Value of reference key
   * @type {string}
   */
  public get val(): string {
    return localStorage.getItem(this.key) || null
  }

  /**
   * Existence of key
   * @type {boolean}
   */
  public get has(): boolean {
    return this.val? true: false
  }

  /**
   * Set new value
   * @param {string} val - New value
   */
  public set val(val: string) {
    localStorage.setItem(this.key, val.toString())
  }

  /**
   * Remove key from localStorage
   * @returns {string}
   */
  public remove(): string {
    localStorage.removeItem(this.key)
    return this.keyname
  }
}

export default LDBKey