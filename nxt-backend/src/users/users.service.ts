import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto, id: string) {
    return this.prisma.user.create({ data: { ...createUserDto, id } });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: string, updateUserDto: UpdateUserDto, requesterId: string) {
    if (id !== requesterId) {
      throw new ForbiddenException('You can only edit your own profile');
    }
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: string, requesterId: string) {
    if (id !== requesterId) {
      throw new ForbiddenException('You can only delete your own profile');
    }
    return this.prisma.user.delete({ where: { id } });
  }
}
