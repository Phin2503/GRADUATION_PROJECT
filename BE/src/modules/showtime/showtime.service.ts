import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Showtime } from './showtime.entity';

import { Theater } from '../theater/theater.entity';
import { Movie } from '../movie/movie.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

import { CreateShowtimeDto } from './dtos/create.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';
import { updateShowtimeDto } from './dtos/update.dto';
import { Order } from '../order/order.entity';
import { TheaterComplex } from '../theaterComplex/theaterComplex.entity';

@Injectable()
export class ShowtimeService {
  constructor(
    @InjectRepository(Showtime)
    private readonly showtimeRepository: Repository<Showtime>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Theater)
    private readonly theaterRepository: Repository<Theater>,
    @InjectRepository(Order)
    private readonly OrderRepository: Repository<Order>,
    @InjectRepository(TheaterComplex)
    private readonly theaterComplexRepository: Repository<TheaterComplex>,
  ) {}

  async createShowtime(requestBody: CreateShowtimeDto) {
    const [movie, theater, theater_complex] = await Promise.all([
      this.movieRepository.findOneBy({ id: requestBody.movieId }),
      this.theaterRepository.findOneBy({ id: requestBody.theaterId }),
      this.theaterComplexRepository.findOneBy({
        id: requestBody.theater_complexId,
      }),
    ]);

    const showtimeStart = new Date(requestBody.showtime_start);
    if (isNaN(showtimeStart.getTime())) {
      throw new BadRequestException('Invalid date value for showtime_start.');
    }

    if (showtimeStart < new Date()) {
      throw new BadRequestException('Cannot add showtimes to past dates');
    }

    if (!movie) throw new NotFoundException('Not found movie!');
    if (!theater) throw new NotFoundException('Not found theater!');
    if (!theater_complex)
      throw new NotFoundException('Not found theater_complex!');

    const showtimeEnd = new Date(
      showtimeStart.getTime() + (movie.duration + 15) * 60000,
    );

    const existingShowtime = await this.showtimeRepository.find({
      where: {
        theater: { id: theater.id },
        showtime_end: MoreThanOrEqual(this.convertUTCToHCM(showtimeStart)),
        showtime_start: LessThanOrEqual(this.convertUTCToHCM(showtimeEnd)),
      },
    });

    if (existingShowtime.length > 0) {
      throw new BadRequestException(
        'Showtime overlaps with another schedule in this theater!',
      );
    }

    try {
      const newShowtime = this.showtimeRepository.create({
        showtime_start: this.convertUTCToHCM(requestBody.showtime_start),
        showtime_end: this.convertUTCToHCM(showtimeEnd),
        movie,
        theater,
        theater_complex,
      });

      return await this.showtimeRepository.save(newShowtime);
    } catch (err) {
      throw new BadRequestException('Something went wrong: ' + err.message);
    }
  }

  convertUTCToHCM(utcDate: Date): Date {
    const date = typeof utcDate === 'string' ? new Date(utcDate) : utcDate;

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date value.');
    }

    const hcmDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);
    return hcmDate;
  }

  async getAll(pagination) {
    return await this.showtimeRepository.find({
      skip: pagination?.skip || 0,
      // take: pagination?.limit ?? DEFAULT_PAGE_SIZE,
      relations: ['theater', 'theater_complex', 'movie'],
    });
  }

  async getById(id) {
    const showtime = await this.showtimeRepository.findOne({
      where: {
        id: id,
      },
      relations: ['theater', 'movie'],
    });

    if (!showtime) {
      throw new NotFoundException('Not found showtime !');
    }

    return showtime;
  }

  async getByMovieId(id) {
    const showtime = await this.showtimeRepository.find({
      where: {
        movie: { id: id },
      },
      relations: ['theater', 'theater.theater_complex', 'movie'], // Đảm bảo truy cập qua theater
    });

    if (!showtime) {
      throw new NotFoundException('Not found showtime!');
    }

    return showtime;
  }

  async deleteById(id) {
    await this.getById(id);
    await this.showtimeRepository.delete(id);
    return 'Delete Successfully !';
  }

  async updateShowtime(id: number, requestBody: updateShowtimeDto) {
    const oldShowtime = await this.getById(id);
    const newShowtime: Showtime = { ...oldShowtime, ...requestBody };
    try {
      await this.showtimeRepository.update(id, newShowtime);
      return newShowtime;
    } catch (err) {
      throw new BadRequestException('Something went wrong !' + err);
    }
  }
}
