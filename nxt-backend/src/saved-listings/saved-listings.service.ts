import { Injectable } from '@nestjs/common';
import { CreateSavedListingDto } from './dto/create-saved-listing.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class SavedListingsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSavedListingDto: CreateSavedListingDto) {
    return this.prisma.savedListing.create({ data: createSavedListingDto });
  }

  findAll() {
    return this.prisma.savedListing.findMany();
  }

  findOne(id: number) {
    return this.prisma.savedListing.findUnique({ where: { id } });
  }

  remove(id: number) {
    return this.prisma.savedListing.delete({ where: { id } });
  }
}
