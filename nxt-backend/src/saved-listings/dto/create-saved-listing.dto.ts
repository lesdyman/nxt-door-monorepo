import { IsInt } from 'class-validator';

export class CreateSavedListingDto {
  @IsInt()
  listingId!: number;
}
