import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto, id: string) {
    // Reaching this endpoint means onboarding just completed — there's no
    // separate "finish onboarding" step, so this is where `onboarded` flips.
    return this.prisma.user.create({
      data: { ...createUserDto, id, onboarded: true },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
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
