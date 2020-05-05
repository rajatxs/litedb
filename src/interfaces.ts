
/** @interface LDBCollectionMetadata */
export interface LDBCollectionMetadata {
  collid: string
  collname: string
}

/** @interface LDBDocumentMetadata */
export interface LDBDocumentMetadata {
  collid: string,
  collname: string
  docid: string
  dockey: string
}

/** @interface LiteDBCollectionInstance */
export interface LiteDBCollectionInstance {
  metadata: LDBCollectionMetadata

  doc(docid: string): LiteDBDocumentInstance

  removeAll(): Array<string>

  docs: Array<LiteDBDocumentInstance>
  entries: Array<string>
  docnames: Array<string>
  length: number
}

/** @interface LiteDBDocumentInstance */
export interface LiteDBDocumentInstance {
  metadata: LDBDocumentMetadata
  exists: boolean
  get(): object
  set(payload: object): string
  remove(): string
}