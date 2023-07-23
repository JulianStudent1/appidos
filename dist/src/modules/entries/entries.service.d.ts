import { AnswerEntity } from '@models/entities/answer.entity';
import { Model } from 'mongoose';
export declare class EntriesService {
    private readonly entries;
    constructor(entries: Model<AnswerEntity>);
    getAll(): Promise<(AnswerEntity & Required<{
        _id: string;
    }>)[]>;
    getByForm(form: string): Promise<AnswerEntity[]>;
    create(body: AnswerEntity): Promise<AnswerEntity>;
}
