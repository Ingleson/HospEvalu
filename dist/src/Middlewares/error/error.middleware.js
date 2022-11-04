"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = require("../../Error/appError");
const errorMiddleware = (err, req, res, _) => {
    if (err instanceof appError_1.AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            code: err.statusCode,
            message: err.message,
        });
    }
    return res.status(500).json({
        status: "error",
        code: 500,
        message: "internal server error",
    });
};
exports.default = errorMiddleware;
