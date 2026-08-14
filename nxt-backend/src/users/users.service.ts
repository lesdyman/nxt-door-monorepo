import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UploadsService } from '../uploads/uploads.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploads: UploadsService,
  ) {}

  create(createUserDto: CreateUserDto, id: string) {
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

  async update(id: string, updateUserDto: UpdateUserDto, requesterId: string) {
    if (id !== requesterId) {
      throw new ForbiddenException('You can only edit your own profile');
    }

    if (updateUserDto.avatar !== undefined) {
      const existing = await this.findOne(id);
      if (existing.avatar && existing.avatar !== updateUserDto.avatar) {
        await this.uploads.deleteFile(existing.avatar);
      }
    }

    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: string, requesterId: string) {
    if (id !== requesterId) {
      throw new ForbiddenException('You can only delete your own profile');
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { listings: true },
    });

    const filesToDelete = [
      ...(user?.avatar ? [user.avatar] : []),
      ...(user?.listings.flatMap((listing) => listing.images) ?? []),
    ];
    if (filesToDelete.length > 0) {
      await this.uploads.deleteFiles(filesToDelete);
    }

    await this.prisma.authUser.delete({ where: { id } });

    return { id };
  }
}
