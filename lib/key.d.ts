import { LiteDBKeyInstance } from './interfaces';
declare class LDBKey implements LiteDBKeyInstance {
    keyname: string;
    /**
     * @public
     * @constructor
     * @param {string} keyname - Reference key
     */
    constructor(keyname: string);
    /**
     * LiteDB key
     * @type {string}
     */
    get key(): string;
    /**
     * Value of reference key
     * @type {string}
     */
    get val(): string;
    /**
     * Existence of key
     * @type {boolean}
     */
    get has(): boolean;
    /**
     * Set new value
     * @param {string} val - New value
     */
    set val(val: string);
    /**
     * Remove key from localStorage
     * @returns {string}
     */
    remove(): string;
}
export default LDBKey;
