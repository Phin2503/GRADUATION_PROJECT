import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

import { UpdateUserDto } from './dtos/updateUser.dto';
import { Permission } from './helper/checkPermission.helper';
import { PaginationDTO } from 'src/generic/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll(pagination: PaginationDTO) {
    return this.userRepository.find({
      skip: pagination.skip,
      take: pagination.limit ?? DEFAULT_PAGE_SIZE,
    });
  }

  async updateById(id: string, requestBody: UpdateUserDto, currentUser: User) {
    let user = await this.userRepository.findOneBy({
      id: id,
    });
    if (!user) {
      throw new NotFoundException('Not found your account !! try again ...');
    }

    Permission.check(id, currentUser);

    user = { ...user, ...requestBody };

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error('Failed to update user: ' + error.message);
    }
  }
}
