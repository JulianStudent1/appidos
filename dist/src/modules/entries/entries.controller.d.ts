import { EntriesService } from './entries.service';
import { AnswerEntity } from '@models/entities/answer.entity';
export declare class EntriesController {
    private entriesService;
    constructor(entriesService: EntriesService);
    getOne(by: string): Promise<AnswerEntity[]>;
    create(body: AnswerEntity): Promise<AnswerEntity>;
}
