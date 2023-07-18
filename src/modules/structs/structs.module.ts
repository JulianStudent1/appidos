import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StructsController } from './structs.controller';
import { StructsService } from './structs.service';
import { FormSchema } from 'src/models/schemas/form.schema';

@Module({
  controllers: [StructsController],
  providers: [StructsService],
  imports: [
    MongooseModule.forFeature([{ name: 'forms', schema: FormSchema }]),
  ],
})
export class StructsModule {}
