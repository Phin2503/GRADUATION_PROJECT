import { BadRequestException } from '@nestjs/common';
import { User } from '../user.entity';

export class Permission {
  static check(id: string, currentUser: User) {
    if (id === currentUser.id) return;
    if (currentUser.role === 'ADMIN') return;

    throw new BadRequestException(`User can't perform action`);
  }
}
