import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { AnswerSchema } from '@models/schemas/answer.schema';

@Module({
  controllers: [EntriesController],
  providers: [EntriesService],
  imports: [
    MongooseModule.forFeature([{ name: 'entries', schema: AnswerSchema }]),
  ],
})
export class EntriesModule {}
