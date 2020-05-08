import { LDBCollectionMetadata, LiteDBCollectionInstance, LiteDBDocumentInstance, LiteDBCollectionOptions } from './interfaces';
declare class LDBCollection implements LiteDBCollectionInstance {
    private collopt;
    /**
     * @type {LDBCollectionMetadata}
     */
    metadata: LDBCollectionMetadata;
    /**
     * Instance name
     * @type {string}
     */
    name: string;
    /**
     * @constructor
     * @param {string} collname - Collection name
     * @param {LiteDBCollectionOptions} - Collection options
     */
    constructor(collname: string, collopt?: LiteDBCollectionOptions);
    /**
     * Generate custom id depends on optional config
     * @returns {string}
     */
    protected generateDocumentID(): string;
    /**
     * Refer to document
     * @param {string} docid - Document ID
     * @returns {LiteDBDocumentInstance}
     */
    doc(docid?: string): LiteDBDocumentInstance;
    /**
     * Remove all documents from collection
     * @returns {Array<string>}
     */
    removeAll(): Array<string>;
    /**
     * Instance of documents
     * @returns {Array<LiteDBDocumentInstance>}
     */
    get docs(): Array<LiteDBDocumentInstance>;
    /**
     * Skip documents
     * @param {range} range - Skip range
     * @returns {Array<LiteDBDocumentInstance>}
     */
    skip(range: number): Array<LiteDBDocumentInstance>;
    /**
     * Limitation of document array
     * @param {number} range - Document limit number
     * @returns {Array<LiteDBDocumentInstance>}
     */
    limit(range: number): Array<LiteDBDocumentInstance>;
    /**
     * Storage access keys related to collection
     * @type {Array<string>}
     */
    get entries(): Array<string>;
    /**
     * Document list
     * @type {Array<string>}
     */
    get docnames(): Array<string>;
    /**
     * Total number of documents
     * @returns {number}
     */
    count(): number;
    /**
     * Alias for count method
     * @type {number}
     */
    get length(): number;
}
export default LDBCollection;
