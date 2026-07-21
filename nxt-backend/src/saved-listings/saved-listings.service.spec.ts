import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { SavedListingsService } from './saved-listings.service';

describe('SavedListingsService', () => {
  let service: SavedListingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SavedListingsService,
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    service = module.get<SavedListingsService>(SavedListingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
