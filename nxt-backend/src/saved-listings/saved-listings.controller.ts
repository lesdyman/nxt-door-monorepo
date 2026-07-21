import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.savedListingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savedListingsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.savedListingsService.remove(+id);
  }
}
