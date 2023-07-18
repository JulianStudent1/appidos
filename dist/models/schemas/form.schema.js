"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormSchema = void 0;
const mongoose_1 = require("mongoose");
exports.FormSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    fields: [{ type: mongoose_1.Schema.Types.Mixed }],
    author: { type: String, required: true },
    creationDate: { type: Date, required: true },
    allowed: { type: [String], required: true },
    name: { type: String, required: true, unique: true },
});
//# sourceMappingURL=form.schema.js.map