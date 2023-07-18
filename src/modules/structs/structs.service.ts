import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormEntity } from 'src/models/entities/form.entity';

@Injectable()
export class StructsService {
  constructor(
    @InjectModel('forms') private readonly structs: Model<FormEntity>,
  ) {}

  async getAllForms() {
    return await this.structs.find();
  }

  async getFormById(idname: string) {
    const res = await this.structs.find({'name': idname});
    const found = res.find(x => x.name === idname);
    if (!found) {
      throw new NotFoundException('not found the requested resource');
    }
    return found;
  }

  async createForm(body: FormEntity) {
    return await this.structs.create(body);
  }
}
