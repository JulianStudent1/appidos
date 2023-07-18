import { Schema } from "mongoose";

export const AnswerSchema: Schema = new Schema({
    form: { type: String, required: true },
    creationDate: { type: Date, required: true },
    author: { type: String, required: true },
}, { strict: false });
