var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import LDBio from './io';
var LDBDocument = /** @class */ (function (_super) {
    __extends(LDBDocument, _super);
    /**
     * Inititate document
     * @param {string} docid - Document ID
     * @param {LDBCollectionMetadata} coll - Collection metadata
     */
    function LDBDocument(docid, coll) {
        var _this = _super.call(this) || this;
        _this.name = docid;
        _this.metadata = __assign(__assign({}, coll), { docid: docid, dockey: coll.collid + "-" + docid // Combine key
         });
        return _this;
    }
    Object.defineProperty(LDBDocument.prototype, "exists", {
        /**
         * Existence of document in storage
         * @type {boolean}
         */
        get: function () {
            return localStorage.getItem(this.metadata.dockey) ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LDBDocument.prototype, "keys", {
        /**
         * Document keys
         * @type {Array<string>}
         */
        get: function () {
            return Object.keys(this.get() || {});
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Get document object
     * @returns {object}
     */
    LDBDocument.prototype.get = function () {
        return this.read(this.metadata.dockey) || null;
    };
    /**
     * Add or update document
     * @param {object} payload - Document payload
     * @returns {string}
     */
    LDBDocument.prototype.set = function (payload) {
        var _a = this.metadata, attachUniqueId = _a.attachUniqueId, docid = _a.docid;
        if (attachUniqueId) {
            // Assign unique id
            Reflect.set(payload, attachUniqueId, docid);
        }
        return this.write(this.metadata.dockey, payload);
    };
    /**
     * Remove the document
     * @returns {string}
     */
    LDBDocument.prototype.remove = function () {
        this.delete(this.metadata.dockey);
        return this.metadata.dockey;
    };
    /**
     * Merge new payload
     * @param {object} mixpayload - Payload
     * @returns {string}
     */
    LDBDocument.prototype.merge = function (mixpayload) {
        return this.set(Object.assign(this.get(), mixpayload));
    };
    /**
     * Stringify object payload
     * @override
     * @returns {string}
     */
    LDBDocument.prototype.toString = function () {
        return JSON.stringify(this.get());
    };
    /**
     * Alias for get() method
     * @override
     * @returns {object}
     */
    LDBDocument.prototype.valueOf = function () {
        return this.get();
    };
    return LDBDocument;
}(LDBio));
export default LDBDocument;
