import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';
import type { CurrentAuthUser } from '../auth/current-user.decorator';
import { Public } from '../auth/public.decorator';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { FindListingsQueryDto } from './dto/find-listings-query.dto';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  create(
    @Body() createListingDto: CreateListingDto,
    @CurrentUser() authUser: CurrentAuthUser,
  ) {
    return this.listingsService.create(createListingDto, authUser.id);
  }

  @Public()
  @Get()
  findAll(@Query() query: FindListingsQueryDto) {
    return this.listingsService.findAll(query);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateListingDto: UpdateListingDto,
    @CurrentUser() authUser: CurrentAuthUser,
  ) {
    return this.listingsService.update(+id, updateListingDto, authUser.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() authUser: CurrentAuthUser) {
    return this.listingsService.remove(+id, authUser.id);
  }
}
