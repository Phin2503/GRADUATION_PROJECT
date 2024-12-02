import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

import { UpdateUserDto } from './dtos/updateUser.dto';
import { Permission } from './helper/checkPermission.helper';
import { PaginationDTO } from 'src/generic/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';
import { AuthService } from './guards/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  findAll(pagination: PaginationDTO) {
    return this.userRepository.find({
      skip: pagination.skip,
      take: pagination.limit ?? DEFAULT_PAGE_SIZE,
    });
  }

  async updateById(id: string, requestBody: UpdateUserDto, currentUser: User) {
    // Tìm người dùng theo ID
    let user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Not found your account !! try again ...');
    }

    // Kiểm tra xem email và số điện thoại đã tồn tại chưa
    const existingUserWithPhone = await this.userRepository.findOneBy({
      phoneNumber: requestBody.phoneNumber,
    });

    const existingUserWithEmail = await this.userRepository.findOneBy({
      email: requestBody.email,
    });

    if (existingUserWithPhone && existingUserWithPhone.id !== id) {
      throw new ConflictException(
        'PhoneNumber already exists !! try again ...',
      );
    }

    if (existingUserWithEmail && existingUserWithEmail.id !== id) {
      throw new ConflictException('Email already exists !! try again ...');
    }

    Permission.check(id, currentUser);

    user = { ...user, ...requestBody };

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error('Failed to update user: ' + error.message);
    }
  }

  async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
    const { currentPassword, newPassword } = updatePasswordDto;

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    const isMatch = await this.authService.comparePasswords(
      currentPassword,
      user.password,
    );

    if (!isMatch) {
      throw new BadRequestException('Current password is incorrect');
    }

    user.password = await this.authService.hashPassword(newPassword);
    await this.userRepository.save(user);

    return { message: 'Password updated successfully' };
  }
}
