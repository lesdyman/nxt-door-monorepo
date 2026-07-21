import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSavedListingDto } from './dto/create-saved-listing.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class SavedListingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSavedListingDto: CreateSavedListingDto) {
    try {
      return await this.prisma.savedListing.create({
        data: createSavedListingDto,
      });
    } catch (error: unknown) {
      const isUniqueConstraintError =
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as { code?: string }).code === 'P2002';

      if (isUniqueConstraintError) {
        throw new ConflictException('Listing already saved by this user');
      }
      throw error;
    }
  }

  findAll(userId: number | undefined) {
    return this.prisma.savedListing.findMany({
      where: userId ? { userId } : {},
      include: {
        listing: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.savedListing.findUnique({ where: { id } });
  }

  async remove(id: number, userId: number) {
    const savedListing = await this.prisma.savedListing.findUnique({
      where: { id },
    });

    if (!savedListing) {
      throw new NotFoundException(`Saved listing #${id} not found`);
    }

    if (savedListing.userId !== userId) {
      throw new ForbiddenException(
        'You can only remove your own saved listings',
      );
    }

    return this.prisma.savedListing.delete({ where: { id } });
  }
}
