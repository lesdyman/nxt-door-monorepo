import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadsService } from '../uploads/uploads.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { FindListingsQueryDto } from './dto/find-listings-query.dto';

@Injectable()
export class ListingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploads: UploadsService,
  ) {}

  create(createListingDto: CreateListingDto, userId: string) {
    return this.prisma.listing.create({
      data: { ...createListingDto, userId },
    });
  }

  findAll({ side, userId, limit = 20, offset = 0 }: FindListingsQueryDto) {
    return this.prisma.listing.findMany({
      where: { side, userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    const listing = await this.prisma.listing.findUnique({ where: { id } });
    if (!listing) {
      throw new NotFoundException(`Listing #${id} not found`);
    }
    return listing;
  }

  async update(id: number, updateListingDto: UpdateListingDto, userId: string) {
    const existing = await this.findOne(id);
    if (existing.userId !== userId) {
      throw new ForbiddenException('You can only edit your own listings');
    }

    if (updateListingDto.images) {
      const removedImages = existing.images.filter(
        (image) => !updateListingDto.images!.includes(image),
      );
      if (removedImages.length > 0) {
        await this.uploads.deleteFiles(removedImages);
      }
    }

    return this.prisma.listing.update({
      where: { id },
      data: updateListingDto,
    });
  }

  async remove(id: number, userId: string) {
    const listing = await this.findOne(id);
    if (listing.userId !== userId) {
      throw new ForbiddenException('You can only delete your own listings');
    }
    if (listing.images.length > 0) {
      await this.uploads.deleteFiles(listing.images);
    }
    return this.prisma.listing.delete({ where: { id } });
  }
}
