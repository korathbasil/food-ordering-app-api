"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.default = BaseError;
//# sourceMappingURL=BaseError.js.map