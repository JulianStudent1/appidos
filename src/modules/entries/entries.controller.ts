import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { EntriesService } from './entries.service';
import { AnswerEntity } from '@models/entities/answer.entity';

/**
 * controller of 'rubrics' route
 */
@Controller('entries')
export class EntriesController {

  constructor(private entriesService: EntriesService) {}

  @Get('getAll/:by')
  async getOne(@Param('by') by: string): Promise<AnswerEntity[]> {
    return await this.entriesService.getByForm(by);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: AnswerEntity): Promise<AnswerEntity> {
    return await this.entriesService.create(body);
  }

}
