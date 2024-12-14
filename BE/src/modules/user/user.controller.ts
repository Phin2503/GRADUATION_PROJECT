import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './guards/auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './decorators/currentUser.decorator';
import { User } from './user.entity';
import { RoleGuard } from './guards/role.guard';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { PaginationDTO } from 'src/generic/pagination.dto';
import { ForgotPasswordDto } from './dtos/forgotPassword.dto';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';
import { Headers } from '@nestjs/common';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/register')
  register(@Body() requestBody: RegisterDto) {
    return this.authService.register(requestBody);
  }

  @Post('/login')
  login(@Body() requestBody: LoginDto) {
    return this.authService.login(requestBody);
  }

  @Get('/')
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  findAll(@Query() pagination: PaginationDTO) {
    return this.userService.findAll(pagination);
  }

  @Get('current-user')
  @UseGuards(AuthGuard)
  getCurrentUser(@CurrentUser() currentUser: User) {
    console.log(currentUser);
    console.log('he');
    return currentUser;
  }

  @Put('update/:id')
  @UseGuards(AuthGuard)
  updateById(
    @Body() requestBody: UpdateUserDto,
    @Param('id') id: string,
    @CurrentUser() currentUser: User,
  ) {
    return this.userService.updateById(id, requestBody, currentUser);
  }

  @Put('change-password/:id')
  @UseGuards(AuthGuard)
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id') id: string,
  ) {
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @Get('verify-token')
  async verifyToken(@Headers('Authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    return this.authService.verifyToken(token);
  }
}
