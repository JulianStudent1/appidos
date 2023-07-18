import { Document } from "mongoose";
export interface AnswerEntity extends Document {
    _id: string;
    form: string;
    creationDate: Date;
    author: string;
    [x: string]: unknown;
}
