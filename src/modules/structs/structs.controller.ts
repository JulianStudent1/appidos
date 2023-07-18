import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { StructsService } from './structs.service';
import { FormEntity } from 'src/models/entities/form.entity';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

/**
 * controller for all the routes behind `experiences` route
 */
@Controller('structs')
export class StructsController {
  
  constructor(private structsService: StructsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('getAll')
  async getAllForms(): Promise<FormEntity[]> {
    return await this.structsService.getAllForms();
  }

  @UseGuards(JwtAuthGuard)
  @Get('getOne/:idName')
  async getFormById(@Param('idName') id: string): Promise<FormEntity> {
    return await this.structsService.getFormById(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createForm(@Body() body: FormEntity) {
    return await this.structsService.createForm(body);
  }
}
