import { StructsService } from './structs.service';
import { FormEntity } from 'src/models/entities/form.entity';
export declare class StructsController {
    private structsService;
    constructor(structsService: StructsService);
    getAllForms(): Promise<FormEntity[]>;
    getFormById(id: string): Promise<FormEntity>;
    createForm(body: FormEntity): Promise<FormEntity & Required<{
        _id: string;
    }>>;
}
