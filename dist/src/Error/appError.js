"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.AppError = void 0;
class AppError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.AppError = AppError;
const handleError = (err, res) => {
    if (err instanceof AppError) {
        return res
            .status(err.statusCode)
            .json({ status: "error", code: err.statusCode, message: err.message });
    }
};
exports.handleError = handleError;
