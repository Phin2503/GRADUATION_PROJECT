import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidSeatException extends HttpException {
  constructor(message: string = 'Invalid seat data') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
