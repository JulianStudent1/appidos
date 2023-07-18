import { Model } from 'mongoose';
import { FormEntity } from 'src/models/entities/form.entity';
export declare class StructsService {
    private readonly structs;
    constructor(structs: Model<FormEntity>);
    getAllForms(): Promise<(FormEntity & Required<{
        _id: string;
    }>)[]>;
    getFormById(idname: string): Promise<FormEntity & Required<{
        _id: string;
    }>>;
    createForm(body: FormEntity): Promise<FormEntity & Required<{
        _id: string;
    }>>;
}
