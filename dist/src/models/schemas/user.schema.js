"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReferenceSchema = exports.UserSchema = exports.RoleSchema = void 0;
const mongoose_1 = require("mongoose");
exports.RoleSchema = new mongoose_1.Schema({
    roleName: String,
    manageUsers: Boolean,
    watchReports: Boolean,
    access: Boolean,
    position: String,
});
exports.UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    document: { type: String, required: true, unique: true },
    typeDocument: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    role: {
        type: exports.RoleSchema,
        required: true,
    },
    bornDate: { type: Date, required: true },
});
exports.UserReferenceSchema = new mongoose_1.Schema({
    id: String,
    name: String,
});
//# sourceMappingURL=user.schema.js.map