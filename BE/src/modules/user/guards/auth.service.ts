import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { ForgotPasswordDto } from '../dtos/forgotPassword.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectQueue('send-mail') private readonly sendMailQueue: Queue,
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async register(requestBody: RegisterDto) {
    const userByEmail = await this.userRepository.findOne({
      where: { email: requestBody.email },
    });
    if (userByEmail) {
      throw new BadRequestException('Email already exists!');
    }

    const userByPhone = await this.userRepository.findOne({
      where: { phoneNumber: requestBody.phoneNumber },
    });
    if (userByPhone) {
      throw new BadRequestException('Phone number already exists!');
    }

    const hashedPassword = await bcrypt.hash(requestBody.password, 10);
    requestBody.password = hashedPassword;

    const newUser = this.userRepository.create({
      ...requestBody,
      createAt: new Date(),
    });
    await this.userRepository.save(newUser);

    const payload = { id: newUser.id };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '2d',
    });

    const verifyToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '2d',
    });
    try {
      await this.sendMailQueue.add('register', {
        to: requestBody.email,
        name: requestBody.fullName,
        verifyToken,
        mailURL: process.env.MAIL_URL,
      });

      return {
        msg: 'Register successfully!',
        accessToken,
        payload: {
          identity: newUser.id,
          fullName: newUser.fullName,
          phoneNumber: newUser.phoneNumber,
          email: newUser.email,
          dateOfBirth: newUser.dateOfBirth,
          role: newUser.role,
        },
      };
    } catch (error) {
      console.error('Error sending verification email:', error); // In ra lỗi
      throw new BadRequestException('Failed to send verification email');
    }
  }

  async login(requestBody: LoginDto) {
    const currentAccount = await this.userRepository.findOneBy({
      email: requestBody.email,
    });

    if (!currentAccount) {
      throw new NotFoundException('Invalid Credentials!');
    }

    const isMatchPass: boolean = await bcrypt.compare(
      requestBody.password,
      currentAccount.password,
    );
    if (!isMatchPass) {
      throw new BadRequestException('Invalid Credentials!');
    }

    const payload = {
      id: currentAccount.id,
      fullName: currentAccount.fullName,
      phoneNumber: currentAccount.phoneNumber,
      email: currentAccount.email,
      dateOfBirth: currentAccount.dateOfBirth,
      role: currentAccount.role,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '2d',
    });

    const refresh_token = await this.jwtService.signAsync(
      { id: currentAccount.id, email: currentAccount.email },
      { secret: process.env.JWT_SECRET, expiresIn: '7d' },
    );

    currentAccount.refreshToken = refresh_token;
    await this.userRepository.save(currentAccount);

    return {
      msg: 'Login Successfully!',
      payload,
      access_token,
      refresh_token,
    };
  }

  async refreshToken(refreshToken: string) {
    const user = await this.userRepository.findOneBy({ refreshToken });
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      const newAccessToken = await this.jwtService.signAsync(
        { id: user.id, email: user.email },
        { secret: process.env.JWT_SECRET, expiresIn: '2d' },
      );

      const newRefreshToken = await this.jwtService.signAsync(
        { id: user.id, email: user.email },
        { secret: process.env.JWT_SECRET, expiresIn: '7d' },
      );

      user.refreshToken = newRefreshToken;
      await this.userRepository.save(user);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async forgotPassword(requestBody: ForgotPasswordDto) {
    const user = await this.userRepository.findOneBy({
      email: requestBody.email,
    });

    if (!user) {
      throw new NotFoundException('Email không tồn tại!');
    }

    const randomPassword = randomBytes(4).toString('hex');
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    user.password = hashedPassword;

    await this.userRepository.save(user);

    try {
      await this.sendMailQueue.add('forgot-password', {
        to: requestBody.email,
        newPassword: randomPassword,
      });
    } catch (err) {
      throw new BadRequestException('Failed to send email with new password');
    }
  }

  async verifyToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      if (decoded) {
        return true;
      }

      return false;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
