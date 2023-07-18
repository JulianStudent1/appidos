import { AnswerEntity } from '@models/entities/answer.entity';
import { FormEntity } from '@models/entities/form.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EntriesService {

  constructor(
    @InjectModel('entries') private readonly entries: Model<AnswerEntity>,
  ) {}

  async getAll() {
    return this.entries.find();
  }

  async getByForm(form: string): Promise<AnswerEntity[]> {
    return await this.entries.find({form});
  }

  async create(body: AnswerEntity): Promise<AnswerEntity> {
    return await this.entries.create(body);
  }
}
