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
  public metadata: LDBCollectionMetadata

  /**
   * Instance name
   * @type {string}
   */
  public name: string

  /**
   * @constructor
   * @param {string} collname - Collection name
   */
  public constructor(collname: string) {
    this.name = collname

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
    // Convert numeric value
    docid = docid.toString()

    if (docid.includes('-')) {
      throw new Error("Use '_' character instead of hyphen")
    }
    return new LDBDocument(docid, {
      collid: this.metadata.collid,
      collname: this.metadata.collname
    })
  }

  /**
   * Remove all documents from collection
   * @returns {Array<string>}
   */
  removeAll(): Array<string> {
    return this.docs.map(doc => doc.remove())
  }

  /**
   * Instance of documents
   * @returns {Array<LiteDBDocumentInstance>}
   */
  public get docs(): Array<LiteDBDocumentInstance> {
    return this.docnames.map(docname => this.doc(docname))  
  }

  /**
   * Skip documents
   * @param {range} range - Skip range
   * @returns {Array<LiteDBDocumentInstance>}
   */
  public skip(range: number): Array<LiteDBDocumentInstance> {
    return this.docnames.slice(range).map(docname => this.doc(docname))
  }
  
  /**
   * Limitation of document array
   * @param {number} range - Document limit number
   * @returns {Array<LiteDBDocumentInstance>}
   */
  public limit(range: number): Array<LiteDBDocumentInstance> {
    return this.docnames.slice(0, range).map(docname => this.doc(docname))
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
   * Total number of documents
   * @returns {number}
   */
  public count(): number {
    return this.entries.length
  }

  /**
   * Alias for count method
   * @type {number}
   */
  public get length(): number {
    return this.count()
  }

}

export default LDBCollection