import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { FindListingsQueryDto } from './dto/find-listings-query.dto';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createListingDto: CreateListingDto) {
    return this.prisma.listing.create({ data: createListingDto });
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

  async update(id: number, updateListingDto: UpdateListingDto) {
    await this.findOne(id);
    return this.prisma.listing.update({
      where: { id },
      data: updateListingDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.listing.delete({ where: { id } });
  }
}
