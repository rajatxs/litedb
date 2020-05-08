import LDBio from './io';
import { LDBDocumentMetadata, LiteDBDocumentInstance, LDBCollectionMetadata } from './interfaces';
declare class LDBDocument extends LDBio implements LiteDBDocumentInstance {
    /**
     * @type {LDBDocumentMetadata}
     */
    metadata: LDBDocumentMetadata;
    /**
     * Instance name
     * @type {string}
     */
    name: string;
    /**
     * Inititate document
     * @param {string} docid - Document ID
     * @param {LDBCollectionMetadata} coll - Collection metadata
     */
    constructor(docid: string, coll: LDBCollectionMetadata);
    /**
     * Existence of document in storage
     * @type {boolean}
     */
    get exists(): boolean;
    /**
     * Document keys
     * @type {Array<string>}
     */
    get keys(): Array<string>;
    /**
     * Get document object
     * @returns {object}
     */
    get(): object;
    /**
     * Add or update document
     * @param {object} payload - Document payload
     * @returns {string}
     */
    set(payload: object): string;
    /**
     * Remove the document
     * @returns {string}
     */
    remove(): string;
    /**
     * Merge new payload
     * @param {object} mixpayload - Payload
     * @returns {string}
     */
    merge(mixpayload: object): string;
    /**
     * Stringify object payload
     * @override
     * @returns {string}
     */
    toString(): string;
    /**
     * Alias for get() method
     * @override
     * @returns {object}
     */
    valueOf(): object;
}
export default LDBDocument;
