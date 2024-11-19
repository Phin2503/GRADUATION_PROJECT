import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from './seat.entity';
import { Theater } from '../theater/theater.entity';
import { CreatSeatDto } from './dtos/create.dto';
import { UpdateSeatDto } from './dtos/update.dto';
import { PaginationDTO } from 'src/generic/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat) private readonly seatRepository: Repository<Seat>,
    @InjectRepository(Theater)
    private readonly theaterRepository: Repository<Theater>,
  ) {}

  async create(requestBody: CreatSeatDto) {
    const theater = await this.theaterRepository.findOneBy({
      id: requestBody.theaterId,
    });

    if (!theater)
      throw new NotFoundException('Not found theater ! try again ...');

    const existingSeat = await this.seatRepository.findOne({
      where: {
        seat_number: requestBody.seat_number,
        theater: { id: requestBody.theaterId },
      },
    });

    if (existingSeat) {
      throw new BadRequestException(
        'Seat already exists in theater ! try again ... ',
      );
    }

    const newSeat = await this.seatRepository.create({
      seat_number: requestBody.seat_number,
      seat_type: requestBody.seat_type,
      theater,
    });

    try {
      return await this.seatRepository.save(newSeat);
    } catch (err) {
      throw new BadRequestException('Something went wrong !' + err);
    }
  }

  async getById(id: number) {
    const seat = await this.seatRepository.findOne({
      where: {
        seat_id: id,
      },
      relations: ['theater'],
    });

    if (!seat) {
      throw new NotFoundException('Not found seat ! ');
    }

    return seat;
  }

  async update(id: number, requestBody: UpdateSeatDto) {
    const theater = await this.theaterRepository.findOneBy({
      id: requestBody.theaterId,
    });

    if (!theater) {
      throw new NotFoundException('Not found theater! Try again ...');
    }

    const oldSeat = await this.getById(id);

    const newSeat = {
      ...oldSeat,
      ...requestBody,
      theater,
    };

    try {
      return await this.seatRepository.save(newSeat);
    } catch (err) {
      throw new BadRequestException('Something went wrong !' + err);
    }
  }

  async getAll(pagination: PaginationDTO) {
    return await this.seatRepository.find({
      skip: pagination?.skip || 0,
      take: pagination?.limit ?? DEFAULT_PAGE_SIZE,
    });
  }

  async delete(id: number) {
    try {
      await this.getById(id);
      await this.seatRepository.delete(id);
      return 'Delete successfully !';
    } catch (err) {
      throw new BadRequestException('Something went wrong !' + err);
    }
  }

  async findByTheaterId(id: number) {
    const theater = await this.theaterRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!theater) {
      throw new NotFoundException('Theater not found! Please try again...');
    }

    try {
      const seats = await this.seatRepository.find({
        where: {
          theater: {
            id: id,
          },
        },
      });

      if (seats.length <= 0) {
        return 'List seats of this theater is empty or not exists ';
      }

      return seats;
    } catch (err) {
      throw new BadRequestException('Something went wrong! ' + err.message);
    }
  }
}
