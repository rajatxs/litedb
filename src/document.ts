import LDBio from './io'
import { 
  LDBDocumentMetadata, 
  LiteDBDocumentInstance, 
  LDBCollectionMetadata } from './interfaces'

class LDBDocument extends LDBio implements LiteDBDocumentInstance {
  /**
   * @type {LDBDocumentMetadata}
   */
  public metadata: LDBDocumentMetadata

  /** 
   * Instance name
   * @type {string}
   */
  public name: string

  /**
   * Inititate document
   * @param {string} docid - Document ID
   * @param {LDBCollectionMetadata} coll - Collection metadata
   */
  constructor(docid: string, coll: LDBCollectionMetadata) {
    super()
    this.name = docid

    this.metadata = {
      ...coll,
      docid,
      dockey: `${coll.collid}-${docid}` // Combine key
    }
  }

  /**
   * Existence of document in storage
   * @type {boolean}
   */
  get exists(): boolean {
    return localStorage.getItem(this.metadata.dockey)? true: false
  }

  /**
   * Document keys
   * @type {Array<string>}
   */
  get keys(): Array<string> {
    return Object.keys(this.get() || {})
  }

  /**
   * Get document object
   * @returns {object}
   */
  public get(): object{
    return this.read(this.metadata.dockey) || null
  }

  /**
   * Add or update document
   * @param {object} payload - Document payload
   * @returns {string} 
   */
  public set(payload: object): string {
    const { attachUniqueId, docid } = this.metadata

    if (attachUniqueId) {
      // Assign unique id
      Reflect.set(payload, attachUniqueId, docid)
    }
    return this.write(this.metadata.dockey, payload)
  }
  
  /**
   * Remove the document
   * @returns {string}
   */
  public remove(): string {
    this.delete(this.metadata.dockey)
    return this.metadata.dockey
  }

  /**
   * Merge new payload
   * @param {object} mixpayload - Payload
   * @returns {string} 
   */
  public merge(mixpayload: object): string {
    return this.set(Object.assign(this.get(), mixpayload))
  }

  /**
   * Stringify object payload
   * @override 
   * @returns {string}
   */
  public toString(): string {
    return JSON.stringify(this.get())
  }

  /**
   * Alias for get() method
   * @override
   * @returns {object}
   */
  public valueOf(): object {
    return this.get()
  }
}

export default LDBDocument