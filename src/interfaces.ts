
/** @interface LDBCollectionMetadata */
export interface LDBCollectionMetadata {
  collid: string
  collname: string
  attachUniqueId?: string
}

export interface LiteDBCollectionOptions {
  unique: 'id' | 'increment'
  generate?(): string
  attachUniqueId?: string
}

/** @interface LDBDocumentMetadata */
export interface LDBDocumentMetadata {
  collid: string,
  collname: string
  docid: string
  dockey: string
  attachUniqueId?: string
}

/** @interface LiteDBCollectionInstance */
export interface LiteDBCollectionInstance {
  metadata: LDBCollectionMetadata
  name: string

  doc(docid?: string): LiteDBDocumentInstance

  removeAll(): Array<string>

  docs: Array<LiteDBDocumentInstance>
  skip(range: number): Array<LiteDBDocumentInstance>
  limit(range: number): Array<LiteDBDocumentInstance>
  entries: Array<string>
  docnames: Array<string>
  length: number
}

/** @interface LiteDBDocumentInstance */
export interface LiteDBDocumentInstance {
  metadata: LDBDocumentMetadata
  name: string
  exists: boolean
  keys: Array<string>
  get(): object
  set(payload: object): string
  remove(): string
  toString(): string
  valueOf(): object
}

/** @interface LiteDBKeyInstance */
export interface LiteDBKeyInstance {
  keyname: string

  key: string
  val: string
  has: boolean
  remove(): string
}