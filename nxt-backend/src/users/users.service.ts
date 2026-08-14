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

    // Cascading the DB delete doesn't touch R2 — clean up the avatar and
    // any listing images ourselves before the rows disappear.
    const filesToDelete = [
      ...(user?.avatar ? [user.avatar] : []),
      ...(user?.listings.flatMap((listing) => listing.images) ?? []),
    ];
    if (filesToDelete.length > 0) {
      await this.uploads.deleteFiles(filesToDelete);
    }

    // Deleting AuthUser (not User) so the cascade fires the right direction:
    // AuthUser -> User -> Listing/SavedListing all get cleaned up together.
    return this.prisma.authUser.delete({ where: { id } });
  }
}
