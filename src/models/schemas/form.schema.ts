import { Schema } from "mongoose";

export const FormSchema: Schema = new Schema({
    title: { type: String, required: true },
    fields: [{ type: Schema.Types.Mixed }], // Array of Mixed type
    author: { type: String, required: true },
    creationDate: { type: Date, required: true },
    allowed: { type: [String], required: true },
    name: { type: String, required: true, unique: true },
});
