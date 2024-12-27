import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { EventService } from './event.service';
import { FilesInterceptor } from '@nestjs/platform-express';

import { CreateEventDto } from './dtos/createEventDto.dto';

@Controller('event')
export class EventController {
  constructor(private readonly EventService: EventService) {}

  @Post('/create')
  @UseInterceptors(FilesInterceptor('files', 2))
  create(
    @Body() requestBody: CreateEventDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const [file1, file2] = files;
    return this.EventService.create(requestBody, file1, file2);
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.EventService.getById(id);
  }

  @Get('')
  getAll() {
    return this.EventService.getAll();
  }
}
