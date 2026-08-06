import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';
import type { CurrentAuthUser } from '../auth/current-user.decorator';
import { SavedListingsService } from './saved-listings.service';
import { CreateSavedListingDto } from './dto/create-saved-listing.dto';

@Controller('saved-listings')
export class SavedListingsController {
  constructor(private readonly savedListingsService: SavedListingsService) {}

  @Post()
  create(
    @Body() createSavedListingDto: CreateSavedListingDto,
    @CurrentUser() authUser: CurrentAuthUser,
  ) {
    return this.savedListingsService.create(createSavedListingDto, authUser.id);
  }

  @Get()
  findAll(@CurrentUser() authUser: CurrentAuthUser) {
    return this.savedListingsService.findAll(authUser.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savedListingsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() authUser: CurrentAuthUser) {
    return this.savedListingsService.remove(+id, authUser.id);
  }
}
