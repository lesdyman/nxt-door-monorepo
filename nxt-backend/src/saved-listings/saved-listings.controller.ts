import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SavedListingsService } from './saved-listings.service';
import { CreateSavedListingDto } from './dto/create-saved-listing.dto';

@Controller('saved-listings')
export class SavedListingsController {
  constructor(private readonly savedListingsService: SavedListingsService) {}

  @Post()
  create(@Body() createSavedListingDto: CreateSavedListingDto) {
    return this.savedListingsService.create(createSavedListingDto);
  }

  @Get()
  findAll(@Query('userId') userId?: string) {
    return this.savedListingsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savedListingsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Query('userId') userId: string) {
    return this.savedListingsService.remove(+id, userId);
  }
}
