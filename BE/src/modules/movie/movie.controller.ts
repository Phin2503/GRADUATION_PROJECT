import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateMovieDTO } from './dtos/create.dto';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
import { PaginationDTO } from 'src/generic/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateMovieDto } from './dtos/update.dto';

@Controller('/movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async createMovie(
    @Body() requestBody: CreateMovieDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.movieService.create(requestBody, file);
  }

  @Put('/update/:id')
  async updateMovie(
    @Body() requestBody: UpdateMovieDto,
    @Param('id') id: number,
  ) {
    return this.movieService.update(requestBody, id);
  }

  @Delete('/delete/:id')
  async deleteMovie(@Param('id') id: number) {
    return this.movieService.delete(id);
  }

  @Get('/:id')
  async findMovieById(@Param('id') id: number) {
    return this.movieService.findMovie(id);
  }

  @Get('')
  async findAllMovie(pagination?: PaginationDTO) {
    if (!pagination) {
      pagination = {
        skip: 1,
        limit: 100,
      };
    }
    return this.movieService.findAll(pagination);
  }
}
