import LDBio from './io'
import { 
  LDBDocumentMetadata, 
  LiteDBDocumentInstance, 
  LDBCollectionMetadata } from './interfaces'

class LDBDocument extends LDBio implements LiteDBDocumentInstance {
  /**
   * @type {LDBDocumentMetadata}
   */
  metadata: LDBDocumentMetadata

  /**
   * Inititate document
   * @param {string} docid - Document ID
   * @param {LDBCollectionMetadata} coll - Collection metadata
   */
  constructor(docid: string, coll: LDBCollectionMetadata) {
    super()
    const { collid, collname } = coll

    this.metadata = {
      collid,
      collname,
      docid,
      dockey: `${collid}-${docid}` // Combine key
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
}

export default LDBDocument