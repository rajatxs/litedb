import LDBDocument from './document'
import { getEntries } from './utils'
import { 
  LDBCollectionMetadata, 
  LiteDBCollectionInstance, 
  LiteDBDocumentInstance } from './interfaces'

class LDBCollection implements LiteDBCollectionInstance {
  /**
   * @type {LDBCollectionMetadata}
   */
  metadata: LDBCollectionMetadata

  /**
   * @constructor
   * @param {string} collname - Collection name
   * @returns {Collection}
   */
  public constructor(collname: string) {
    this.metadata = {
      collid: `ldb:coll-${collname}`,
      collname
    }
  }

  /**
   * Refer to document
   * @param {string} docid - Document ID
   * @returns {LiteDBDocumentInstance}
   */
  public doc(docid: string = String(Date.now())): LiteDBDocumentInstance {
    if (docid.includes('-')) {
      throw new Error("Use '_' character instead of hyphen")
    }
    return new LDBDocument(docid, {
      collid: this.metadata.collid,
      collname: this.metadata.collname
    })
  }

  /**
   * Instance of documents
   * @returns {Array<LiteDBDocumentInstance>}
   */
  public get docs(): Array<LiteDBDocumentInstance> {
    return this.docnames.map(docname => this.doc(docname))  
  }
  
  /**
   * Storage access keys related to collection
   * @type {Array<string>}
   */
  public get entries(): Array<string> {
    return getEntries(this.metadata.collid)
  }
  
  /**
   * Document list
   * @type {Array<string>}
   */
  public get docnames(): Array<string> {
    return this.entries.map(key => key.split(/\-/)[2])
  }

  /**
   * @type {number}
   * @description Total number of documents
   */
  public get length(): number {
    return this.entries.length
  }
}

export default LDBCollection