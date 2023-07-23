import { Document } from "mongoose";
export declare class FormEntity extends Document {
    _id: string;
    title: string;
    fields: any[];
    author: string;
    creationDate: Date;
    allowed: string[];
    name: string;
}
