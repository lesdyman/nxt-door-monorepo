import { PartialType } from '@nestjs/mapped-types';
import { CreateSavedListingDto } from './create-saved-listing.dto';

export class UpdateSavedListingDto extends PartialType(CreateSavedListingDto) {}
