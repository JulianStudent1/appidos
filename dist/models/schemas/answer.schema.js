"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerSchema = void 0;
const mongoose_1 = require("mongoose");
exports.AnswerSchema = new mongoose_1.Schema({
    form: { type: String, required: true },
    creationDate: { type: Date, required: true },
    author: { type: String, required: true },
}, { strict: false });
//# sourceMappingURL=answer.schema.js.map