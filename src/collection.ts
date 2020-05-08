import LDBDocument from './document'
import { getEntries } from './utils'
import { 
  LDBCollectionMetadata, 
  LiteDBCollectionInstance, 
  LiteDBDocumentInstance,
  LiteDBCollectionOptions } from './interfaces'

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
   * @param {LiteDBCollectionOptions} - Collection options
   */
  public constructor(collname: string, private collopt: LiteDBCollectionOptions = { unique: 'id' }) {
    this.name = collname

    this.metadata = {
      collid: `ldb:coll-${collname}`,
      collname
    }
  }

  /**
   * Generate custom id depends on optional config
   * @returns {string}
   */
  protected generateDocumentID(): string {
    let genId: string = null

    switch(this.collopt.unique) {
      case 'id':
        const genLogic: Function = this.collopt.generate

        if (genLogic && typeof genLogic === 'function') {
          // Generate custom id
          genId = genLogic.call({}, this)
        } else {
          // Default timestamp
          genId = String(Date.now())
        }
        break
      case 'increment':
        const incId: number = this.count() + 1
        genId = String(incId)
        break
    }
    return genId
  }

  /**
   * Refer to document
   * @param {string} docid - Document ID
   * @returns {LiteDBDocumentInstance}
   */
  public doc(docid?: string): LiteDBDocumentInstance {

    if (docid) {
      // External id
      // Convert numeric value
      docid = docid.toString()
    } else {
      // Manual id
      docid = this.generateDocumentID()
    }

    if (docid.includes('-')) {
      throw new Error("Use '_' character instead of hyphen")
    }

    const { collid, collname } = this.metadata
    const { attachUniqueId } = this.collopt

    return new LDBDocument(docid, {
      collid,
      collname,
      attachUniqueId
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