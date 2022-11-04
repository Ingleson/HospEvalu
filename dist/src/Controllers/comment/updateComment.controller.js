"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const updateComment_service_1 = __importDefault(require("../../Services/comment/updateComment.service"));
const updateCommentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    const userId = req.params.id;
    const commentUp = yield (0, updateComment_service_1.default)({ userId, content });
    return res.status(200).json(commentUp);
});
exports.default = updateCommentController;
