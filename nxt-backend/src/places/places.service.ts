import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Injectable()
export class PlacesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPlaceDto: CreatePlaceDto) {
    return this.prisma.place.create({
      data: {
        ...createPlaceDto,
        boundary: createPlaceDto.boundary as unknown as Prisma.InputJsonValue,
      },
    });
  }

  findAll() {
    return this.prisma.place.findMany();
  }

  findOne(id: string) {
    return this.prisma.place.findUnique({ where: { id } });
  }

  update(id: string, updatePlaceDto: UpdatePlaceDto) {
    return this.prisma.place.update({
      where: { id },
      data: {
        ...updatePlaceDto,
        boundary: updatePlaceDto.boundary as unknown as
          Prisma.InputJsonValue | undefined,
      },
    });
  }

  remove(id: string) {
    return this.prisma.place.delete({ where: { id } });
  }
}
